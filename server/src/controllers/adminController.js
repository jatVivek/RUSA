import { MODEL_REGISTRY, MANDATORY_SECTION_KEYS, PRESET_PALETTES } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

const SINGLETON_RESOURCES = [
  'theme',
  'themes',
  'sitesettings',
  'settings',
  'sitesetting',
  'hero',
  'about',
];

function getModel(resource) {
  const key = (resource || '').toLowerCase().replace(/[-_]/g, '');
  return MODEL_REGISTRY[key] || null;
}

export async function listItems(req, res, next) {
  try {
    const { resource } = req.params;
    const Model = getModel(resource);
    if (!Model) {
      return errorResponse(res, `Unknown resource '${resource}'`, 404);
    }

    const normalized = (resource || '').toLowerCase().replace(/[-_]/g, '');
    // Singletons
    if (SINGLETON_RESOURCES.includes(normalized)) {
      const item = await Model.findOne();
      return successResponse(res, item || {}, `${resource} retrieved`);
    }

    const items = await Model.find().sort({ order: 1, createdAt: -1 });
    return successResponse(res, items, `${resource} list retrieved`);
  } catch (err) {
    next(err);
  }
}

export async function getItemById(req, res, next) {
  try {
    const { resource, id } = req.params;
    const Model = getModel(resource);
    if (!Model) {
      return errorResponse(res, `Unknown resource '${resource}'`, 404);
    }

    const normalized = (resource || '').toLowerCase().replace(/[-_]/g, '');
    if (SINGLETON_RESOURCES.includes(normalized) || id === 'singleton' || id === 'current') {
      const item = await Model.findOne();
      return successResponse(res, item || {}, `${resource} item retrieved`);
    }

    const item = await Model.findById(id);
    if (!item) {
      return errorResponse(res, `${resource} not found`, 404);
    }
    return successResponse(res, item, `${resource} item retrieved`);
  } catch (err) {
    next(err);
  }
}

export async function createItem(req, res, next) {
  try {
    const { resource } = req.params;
    const Model = getModel(resource);
    if (!Model) {
      return errorResponse(res, `Unknown resource '${resource}'`, 404);
    }

    const payload = { ...req.body };
    delete payload._id;
    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;

    const normalized = (resource || '').toLowerCase().replace(/[-_]/g, '');
    // For singletons (SiteSettings, Theme, Hero, About), update or upsert
    if (SINGLETON_RESOURCES.includes(normalized)) {
      const updated = await Model.findOneAndUpdate({}, { $set: payload }, { upsert: true, new: true });
      return successResponse(res, updated, `${resource} updated successfully`);
    }

    // Auto-order calculation
    if (payload.order === undefined) {
      const count = await Model.countDocuments();
      payload.order = count;
    }

    const item = await Model.create(payload);
    return successResponse(res, item, `${resource} created successfully`, 201);
  } catch (err) {
    next(err);
  }
}

export async function updateItem(req, res, next) {
  try {
    const { resource, id } = req.params;
    const Model = getModel(resource);
    if (!Model) {
      return errorResponse(res, `Unknown resource '${resource}'`, 404);
    }

    const payload = { ...req.body };
    delete payload._id;
    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;

    const normalized = (resource || '').toLowerCase().replace(/[-_]/g, '');
    // Singletons or singleton ID
    if (SINGLETON_RESOURCES.includes(normalized) || id === 'singleton' || id === 'current') {
      const updated = await Model.findOneAndUpdate({}, { $set: payload }, { upsert: true, new: true });
      return successResponse(res, updated, `${resource} updated`);
    }

    const updated = await Model.findByIdAndUpdate(id, { $set: payload }, { new: true });
    if (!updated) {
      return errorResponse(res, `${resource} item not found`, 404);
    }

    return successResponse(res, updated, `${resource} updated successfully`);
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const { resource, id } = req.params;
    const Model = getModel(resource);
    if (!Model) {
      return errorResponse(res, `Unknown resource '${resource}'`, 404);
    }

    // Check mandatory section guard
    if (resource === 'section' || resource === 'sections') {
      const section = await Model.findById(id);
      if (section && (section.isMandatory || MANDATORY_SECTION_KEYS.includes(section.key))) {
        return errorResponse(res, `Mandatory section '${section.title}' cannot be deleted. You can toggle its visibility instead.`, 403);
      }
    }

    if (id === 'singleton' || id === 'current') {
      const item = await Model.findOne();
      if (item) {
        await Model.findByIdAndDelete(item._id);
      }
      return successResponse(res, null, `${resource} deleted successfully`);
    }

    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) {
      return errorResponse(res, `${resource} not found`, 404);
    }

    return successResponse(res, null, `${resource} deleted successfully`);
  } catch (err) {
    next(err);
  }
}

export async function toggleItem(req, res, next) {
  try {
    const { resource, id } = req.params;
    const Model = getModel(resource);
    if (!Model) {
      return errorResponse(res, `Unknown resource '${resource}'`, 404);
    }

    const item = await Model.findById(id);
    if (!item) {
      return errorResponse(res, `${resource} item not found`, 404);
    }

    const nextState = req.body && typeof req.body.isActive === 'boolean' ? req.body.isActive : !item.isActive;

    const updated = await Model.findByIdAndUpdate(id, { isActive: nextState }, { new: true });
    return successResponse(res, updated, `${resource} visibility set to ${nextState ? 'active' : 'inactive'}`);
  } catch (err) {
    next(err);
  }
}

export async function reorderItems(req, res, next) {
  try {
    const { resource } = req.params;
    const Model = getModel(resource);
    if (!Model) {
      return errorResponse(res, `Unknown resource '${resource}'`, 404);
    }

    const { items } = req.body; // array of { id, order }
    if (!Array.isArray(items)) {
      return errorResponse(res, 'Array of { id, order } items is required', 400);
    }

    await Promise.all(
      items.map((item) =>
        Model.findByIdAndUpdate(item.id, { order: Number(item.order) })
      )
    );

    const updatedList = await Model.find().sort({ order: 1 });
    return successResponse(res, updatedList, `${resource} reordered successfully`);
  } catch (err) {
    next(err);
  }
}

export async function resetTheme(req, res, next) {
  try {
    const Model = MODEL_REGISTRY.theme;
    const defaultPalette = PRESET_PALETTES['Obsidian Aurora'];
    const updated = await Model.findOneAndUpdate(
      {},
      {
        activePreset: 'Obsidian Aurora',
        defaultMode: 'dark',
        fontHeading: 'Space Grotesk',
        fontBody: 'Inter',
        fontMono: 'Geist',
        borderRadius: '0.5rem',
        colors: {
          dark: defaultPalette.dark,
          light: defaultPalette.light,
        },
        presets: PRESET_PALETTES,
      },
      { upsert: true, new: true }
    );
    return successResponse(res, updated, 'Theme reset to default Obsidian Aurora palette');
  } catch (err) {
    next(err);
  }
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return errorResponse(res, 'No image file provided in request', 400);
    }

    const mime = req.file.mimetype || 'image/png';
    const base64 = req.file.buffer ? req.file.buffer.toString('base64') : '';
    const dataUrl = `data:${mime};base64,${base64}`;

    return successResponse(
      res,
      {
        url: dataUrl,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: mime,
      },
      'Image uploaded and attached successfully',
      201
    );
  } catch (err) {
    next(err);
  }
}
