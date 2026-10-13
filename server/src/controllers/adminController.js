import { MODEL_REGISTRY, MANDATORY_SECTION_KEYS, PRESET_PALETTES } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

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

    // Singletons
    if (resource === 'theme' || resource === 'sitesettings') {
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

    // For singletons (SiteSettings, Theme), update or upsert
    if (resource === 'theme' || resource === 'sitesettings') {
      const updated = await Model.findOneAndUpdate({}, { $set: req.body }, { upsert: true, new: true });
      return successResponse(res, updated, `${resource} updated successfully`);
    }

    // Auto-order calculation
    if (req.body.order === undefined) {
      const count = await Model.countDocuments();
      req.body.order = count;
    }

    const item = await Model.create(req.body);
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

    // Singletons
    if (resource === 'theme' || resource === 'sitesettings') {
      const updated = await Model.findOneAndUpdate({}, { $set: req.body }, { upsert: true, new: true });
      return successResponse(res, updated, `${resource} updated`);
    }

    const updated = await Model.findByIdAndUpdate(id, { $set: req.body }, { new: true });
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

    // Return the hosted path (or data URL / static path)
    const fileUrl = `/uploads/${req.file.filename}`;
    return successResponse(
      res,
      {
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
      'Image uploaded successfully',
      201
    );
  } catch (err) {
    next(err);
  }
}
