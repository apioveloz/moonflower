# Moonflower theme: mega menu changes

Changed files for the Shopify theme **Moonflower – Mega menu** (Blockshop 13.2.0).
Paths mirror the theme's folders.

- `snippets/x-menu.liquid`: puts a menu item's image blocks in a tile grid. With 1–4 tiles they stay large promo tiles. With 5 or more they become a compact MERIT-style grid of up to 6 per row.
- `assets/mf-nav.css`: tile grid styles for the desktop panel and a compact 3-up grid in the mobile drawer.
- `sections/header-group.json`: 11 **Shop** tiles (7 categories + 4 hero products) and 11 **Rituals** tiles (hair → face → body routine), 22 images in all. **Bundles** is unchanged.

Collection tiles use the collection's image automatically. Product tiles point at the product's own photo in Files.
