{
  "meta": {
    "project": "FitGearzzz",
    "scope": "Complete website redesign (all routes in frontend/src/App.js)",
    "north_star": "Warm paper premium storefront: calm, specific, helpful. Editorial grid + disciplined Comfortaa. Burnt orange only for meaningful emphasis.",
    "critical_constraints": [
      "Shopify domains currently return HTTP 402; do not assume catalog availability.",
      "MUST NOT use mockProducts/mockCollections or invent products/photos.",
      "When catalog unavailable: show honest, beautiful 'Catalog temporarily unavailable' states with retry.",
      "Do not depict stock images as sale products. Lifestyle/editorial imagery is context only.",
      "No new integrations; keep existing flows (wishlist, guest cart, checkout, accounts, admin).",
      "No transparent card surfaces (avoid glassmorphism).",
      "All interactive + key informational elements MUST include data-testid (kebab-case).",
      "Codebase uses .js (not .tsx): guidelines must be implementable in React JS + Tailwind + shadcn/ui."
    ]
  },

  "brand_attributes": {
    "tone": ["calm", "specific", "helpful", "premium", "Indian everyday fitness"],
    "avoid": ["hype", "invented authority", "fake scarcity", "overly loud gradients", "scroll hijacking"],
    "signature_accent": {
      "concept": "Tiny handwritten note used sparingly as a human touch (not a second reading system)",
      "font_class": "font-hand",
      "usage": [
        "1 short line under hero headline",
        "small annotation near section titles (max 1 per viewport)",
        "order success / thank-you microcopy"
      ],
      "rules": [
        "Never use for paragraphs",
        "Never exceed text-sm",
        "Use muted ink color, not burnt orange"
      ]
    }
  },

  "design_tokens": {
    "css_custom_properties": {
      "file": "/app/frontend/src/styles/brand.css (preferred) OR /app/frontend/src/index.css overrides",
      "note": "Keep shadcn radix tokens for primitives, but define storefront tokens below and use them via Tailwind arbitrary values or utility classes.",
      "tokens": {
        "--paper": "#F1EEE8",
        "--paper-2": "#EFE9DF",
        "--paper-3": "#E7E0D6",

        "--ink": "#171717",
        "--ink-2": "#2A2622",
        "--muted-ink": "#5B554E",

        "--accent": "#F15A24",
        "--accent-2": "#DB4A2B",
        "--accent-soft": "#FDE2D7",

        "--border": "#E4DFD7",
        "--border-strong": "#C9C4BA",

        "--success": "#1F7A5A",
        "--warning": "#B45309",
        "--danger": "#B42318",

        "--shadow-sm": "0 1px 3px rgba(23,23,23,0.08), 0 1px 2px rgba(23,23,23,0.05)",
        "--shadow-md": "0 12px 20px -8px rgba(23,23,23,0.12), 0 4px 8px -3px rgba(23,23,23,0.06)",

        "--radius-sm": "10px",
        "--radius-md": "14px",
        "--radius-lg": "18px",

        "--focus-ring": "0 0 0 3px rgba(241,90,36,0.25)",

        "--container-max": "1120px",
        "--gutter": "16px"
      }
    },

    "tailwind_usage": {
      "backgrounds": [
        "bg-[var(--paper)]",
        "bg-[var(--paper-2)]",
        "bg-white (cards only)"
      ],
      "text": [
        "text-[var(--ink)]",
        "text-[var(--muted-ink)]"
      ],
      "borders": [
        "border-[var(--border)]",
        "ring-[var(--accent)]"
      ],
      "shadows": [
        "shadow-[var(--shadow-sm)]",
        "shadow-[var(--shadow-md)]"
      ],
      "radius": [
        "rounded-[var(--radius-sm)]",
        "rounded-[var(--radius-md)]",
        "rounded-[var(--radius-lg)]"
      ]
    }
  },

  "typography": {
    "font_pairing": {
      "primary": {
        "name": "Comfortaa",
        "usage": "All headings + body (disciplined system).",
        "css": "Already imported in index.css; use .font-display for explicit sections."
      },
      "secondary": {
        "name": "Manrope",
        "usage": "Dense UI microcopy (tables, admin, form helper text) where Comfortaa feels too wide.",
        "css": "Already imported; use .font-manrope selectively."
      },
      "handwritten": {
        "name": "Caveat",
        "usage": "Signature accent only.",
        "css": "Already imported; use .font-hand."
      }
    },

    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]",
      "h2": "text-2xl sm:text-3xl font-semibold tracking-[-0.01em] leading-[1.15]",
      "h3": "text-xl sm:text-2xl font-semibold leading-[1.2]",
      "subheading": "text-base md:text-lg text-[var(--muted-ink)] leading-[1.6]",
      "body": "text-sm sm:text-base text-[var(--ink)] leading-[1.7]",
      "small": "text-xs sm:text-sm text-[var(--muted-ink)] leading-[1.6]",
      "label": "text-xs uppercase tracking-[0.12em] text-[var(--muted-ink)]"
    },

    "rules": [
      "Avoid heavy weights everywhere; reserve font-semibold for headings and primary CTAs.",
      "Use uppercase micro-labels sparingly (filters, breadcrumbs, section eyebrow).",
      "Never use handwritten font for navigation, product titles, or long text."
    ]
  },

  "layout_grid": {
    "container": {
      "className": "mx-auto w-full max-w-[var(--container-max)] px-4 sm:px-6",
      "note": "Mobile-first; keep generous vertical spacing."
    },
    "grid_system": {
      "desktop": "12-column mental model; implement with Tailwind grid-cols-12",
      "gutters": "gap-4 sm:gap-6",
      "section_spacing": "py-10 sm:py-14 lg:py-16",
      "card_spacing": "p-4 sm:p-6"
    },
    "occasional_asymmetry_patterns": [
      "Section header occupies col-span-4; content occupies col-span-8",
      "Offset a small note block by 1 column on lg (lg:col-start-2)",
      "Use a tall editorial image in col-span-5 next to a stacked text + status block in col-span-7"
    ]
  },

  "color_usage_rules": {
    "priority": [
      "Paper backgrounds for pages",
      "White cards for content blocks",
      "Near-black ink for text",
      "Burnt orange only for actions + meaningful emphasis"
    ],
    "accent_discipline": [
      "Primary buttons, active nav item indicator, price highlight (only when real product data exists), selected filter chip, focus ring.",
      "Never use accent as large background fills; keep it as strokes, small fills, or 1 CTA per section."
    ],
    "gradients": {
      "allowed": [
        "Hero background overlay only (max 20% viewport), very subtle warm-to-transparent",
        "Decorative corner wash behind hero image (very low opacity)"
      ],
      "recommended_hero_overlay": "linear-gradient(180deg, rgba(241,238,232,0.0) 0%, rgba(241,238,232,0.85) 70%, rgba(241,238,232,1) 100%)",
      "hard_rules": [
        "No dark/saturated gradients (no purple/pink/blue combos).",
        "No gradients on text-heavy areas or small UI elements (<100px).",
        "No stacked gradients in same viewport."
      ]
    }
  },

  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui/",
      "use_components": [
        {"name": "button", "path": "components/ui/button.jsx"},
        {"name": "card", "path": "components/ui/card.jsx"},
        {"name": "badge", "path": "components/ui/badge.jsx"},
        {"name": "navigation-menu", "path": "components/ui/navigation-menu.jsx"},
        {"name": "breadcrumb", "path": "components/ui/breadcrumb.jsx"},
        {"name": "sheet", "path": "components/ui/sheet.jsx"},
        {"name": "drawer", "path": "components/ui/drawer.jsx"},
        {"name": "tabs", "path": "components/ui/tabs.jsx"},
        {"name": "accordion", "path": "components/ui/accordion.jsx"},
        {"name": "select", "path": "components/ui/select.jsx"},
        {"name": "slider", "path": "components/ui/slider.jsx"},
        {"name": "checkbox", "path": "components/ui/checkbox.jsx"},
        {"name": "radio-group", "path": "components/ui/radio-group.jsx"},
        {"name": "pagination", "path": "components/ui/pagination.jsx"},
        {"name": "table", "path": "components/ui/table.jsx"},
        {"name": "dialog", "path": "components/ui/dialog.jsx"},
        {"name": "tooltip", "path": "components/ui/tooltip.jsx"},
        {"name": "skeleton", "path": "components/ui/skeleton.jsx"},
        {"name": "sonner", "path": "components/ui/sonner.jsx"},
        {"name": "calendar", "path": "components/ui/calendar.jsx"}
      ]
    },

    "button_system": {
      "variants": {
        "primary": {
          "intent": "Primary action only (Add to cart, Checkout, Retry catalog)",
          "classes": "bg-[var(--accent)] text-white hover:bg-[var(--accent-2)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--radius-sm)]",
          "motion": "transition-colors duration-200"
        },
        "secondary": {
          "intent": "Secondary actions (Wishlist, Continue shopping)",
          "classes": "bg-white text-[var(--ink)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--paper-2)] rounded-[var(--radius-sm)]",
          "motion": "transition-colors duration-200"
        },
        "ghost": {
          "intent": "Tertiary actions (inline links, icon buttons)",
          "classes": "bg-transparent text-[var(--ink)] hover:bg-[var(--paper-2)] rounded-[var(--radius-sm)]",
          "motion": "transition-colors duration-200"
        },
        "danger": {
          "intent": "Destructive actions (Remove item, Delete address)",
          "classes": "bg-[var(--danger)] text-white hover:opacity-95 rounded-[var(--radius-sm)]",
          "motion": "transition-opacity duration-200"
        }
      },
      "sizes": {
        "sm": "h-9 px-3 text-sm",
        "md": "h-10 px-4 text-sm",
        "lg": "h-11 px-5 text-base"
      },
      "icon_buttons": {
        "classes": "h-10 w-10 rounded-[var(--radius-sm)] border border-[var(--border)] bg-white hover:bg-[var(--paper-2)] transition-colors duration-200",
        "note": "Use lucide-react icons; always add aria-label + data-testid."
      }
    },

    "card_system": {
      "base": "bg-white border border-[var(--border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]",
      "hover": "hover:shadow-[var(--shadow-md)] hover:border-[color:rgba(241,90,36,0.35)]",
      "motion": "transition-[border-color,box-shadow] duration-200",
      "rule": "No transparent/glass cards."
    },

    "forms": {
      "inputs": {
        "component": "input.jsx / textarea.jsx / select.jsx",
        "classes": "bg-white border-[var(--border)] focus-visible:shadow-[var(--focus-ring)] rounded-[var(--radius-sm)]",
        "helper_text": "text-xs text-[var(--muted-ink)] font-manrope"
      },
      "validation": {
        "error_text": "text-xs text-[var(--danger)]",
        "success_text": "text-xs text-[var(--success)]",
        "pattern": "Inline message under field + summary at top for long forms"
      }
    },

    "status_blocks": {
      "catalog_unavailable": {
        "purpose": "Used on Home, Catalog, Product Detail, Cart (wherever Shopify data is needed)",
        "layout": "Card with icon + title + short explanation + Retry button + optional 'Check again later' link",
        "classes": "bg-white border border-[var(--border)] rounded-[var(--radius-md)] p-4 sm:p-6",
        "cta": "Retry uses primary button variant",
        "copy": {
          "title": "Catalog temporarily unavailable",
          "body": "We can’t reach the store right now (Shopify returned an access error). You can still read our guides and policies, and try again in a moment."
        },
        "data_testids": {
          "container": "catalog-unavailable",
          "retry": "catalog-unavailable-retry-button",
          "details": "catalog-unavailable-details"
        }
      },
      "empty_states": {
        "wishlist": "No saved items yet — show 2 suggested categories (not products) + link to Catalog",
        "cart": "Your cart is empty — show link to Catalog + Shipping/Returns reassurance",
        "orders": "No orders yet — explain how orders appear after checkout"
      }
    }
  },

  "page_blueprints": {
    "global_shell": {
      "header": {
        "structure": [
          "Left: wordmark (Comfortaa) + small handwritten note optional",
          "Center (desktop): NavigationMenu (Home, Catalog, About, Blog, FAQ, Contact)",
          "Right: icon buttons (Search optional if exists, Wishlist, Cart, Account)"
        ],
        "mobile": "Use Sheet/Drawer for nav; keep cart + wishlist icons visible.",
        "sticky": "Sticky header with subtle border-bottom; no heavy shadows.",
        "data_testids": {
          "nav": "site-header-nav",
          "wishlist": "header-wishlist-button",
          "cart": "header-cart-button",
          "account": "header-account-button",
          "mobile_menu": "header-mobile-menu-button"
        }
      },
      "footer": {
        "layout": "3-column on desktop: Shop / Support / Company + newsletter (if exists) + policies",
        "style": "paper-2 background, top border, small text",
        "data_testids": {
          "footer": "site-footer",
          "footer-links": "site-footer-links"
        }
      }
    },

    "home": {
      "hero": {
        "goal": "Premium editorial first impression even when catalog is down.",
        "layout": "Grid: left text (col-span-7), right editorial image (col-span-5). On mobile: image first then text.",
        "content": [
          "Eyebrow label (text-xs uppercase)",
          "H1: specific promise (no hype)",
          "Subheading: calm, helpful",
          "Primary CTA: Browse catalog",
          "Secondary CTA: Read fit guide",
          "Signature accent line (optional)"
        ],
        "image_rule": "Use lifestyle/editorial image only as context; never label it as a product.",
        "below_hero": "Catalog status block (always present): shows available collections/products OR unavailable state card.",
        "data_testids": {
          "hero": "home-hero",
          "primary_cta": "home-hero-primary-cta",
          "secondary_cta": "home-hero-secondary-cta",
          "catalog_status": "home-catalog-status"
        }
      },
      "sections": [
        {
          "name": "Shop by intent (categories)",
          "layout": "3-up cards desktop, 1-up mobile; each card is a category link (not products)",
          "note": "Works even when catalog unavailable; categories link to Catalog with preselected filter if supported.",
          "data_testid": "home-shop-by-intent"
        },
        {
          "name": "Editorial: Materials & care",
          "layout": "Asymmetric split: text block + small image",
          "data_testid": "home-editorial-materials"
        },
        {
          "name": "Policies preview",
          "layout": "Accordion with Shipping, Returns, Privacy highlights",
          "component": "accordion",
          "data_testid": "home-policies-preview"
        }
      ]
    },

    "catalog_products": {
      "layout": "Left filter column (desktop) + product grid (right). Mobile: filters in Sheet.",
      "grid": "2 columns mobile, 3 columns md, 4 columns lg; consistent aspect ratio.",
      "filters": ["collection", "price slider", "size", "color"],
      "components": ["sheet", "select", "slider", "checkbox", "badge", "pagination"],
      "unavailable": "Replace grid with catalog_unavailable status block + keep filters disabled but visible.",
      "data_testids": {
        "filters_open": "catalog-filters-open-button",
        "filters_panel": "catalog-filters-panel",
        "product_grid": "catalog-product-grid",
        "pagination": "catalog-pagination"
      }
    },

    "product_detail": {
      "layout": "Mobile: image carousel then details. Desktop: 7/5 split (media/details).",
      "components": ["carousel", "tabs", "select", "button", "badge", "accordion"],
      "rules": [
        "If product data unavailable: show status block + keep page shell + show 'Back to catalog'",
        "Variant selection must be clear; disable Add to cart until variant selected",
        "Wishlist button is secondary/ghost"
      ],
      "data_testids": {
        "title": "product-title",
        "price": "product-price",
        "variant_select": "product-variant-select",
        "add_to_cart": "product-add-to-cart-button",
        "wishlist": "product-wishlist-button"
      }
    },

    "wishlist": {
      "layout": "Simple list/grid with remove + add-to-cart (if available)",
      "empty_state": "Use empty_states.wishlist",
      "data_testids": {
        "list": "wishlist-items",
        "empty": "wishlist-empty-state"
      }
    },

    "cart_checkout": {
      "cart": {
        "layout": "Cart items list + order summary card (sticky on desktop)",
        "components": ["card", "button", "separator", "input"],
        "data_testids": {
          "cart": "cart-page",
          "checkout": "cart-checkout-button",
          "line_item": "cart-line-item"
        }
      },
      "checkout": {
        "note": "Do not replace existing Shopify checkout flow; style wrapper pages only.",
        "data_testid": "checkout-page"
      },
      "order_success": {
        "layout": "Centered content block but left-aligned text; show order id + next steps",
        "signature_accent": "Allowed (one line)",
        "data_testid": "order-success"
      }
    },

    "account_orders_profile": {
      "style": "Clean, utilitarian, still on paper background. Use Manrope for dense tables.",
      "components": ["tabs", "table", "card", "button", "dialog"],
      "data_testids": {
        "orders_table": "orders-table",
        "profile_form": "profile-form"
      }
    },

    "admin": {
      "style": "Same palette; more compact spacing; avoid decorative imagery.",
      "components": ["table", "dialog", "select", "tabs", "badge"],
      "data_testids": {
        "admin_shell": "admin-shell",
        "admin_table": "admin-table"
      }
    },

    "content_pages": {
      "about_blog_features_contact_faq_shipping_privacy": {
        "layout": "Readable single-column with occasional pull-quote card; max-w-[72ch]",
        "components": ["breadcrumb", "separator", "accordion"],
        "typography": "Use disciplined headings; avoid huge hero banners.",
        "data_testids": {
          "content": "content-page",
          "toc": "content-toc"
        }
      }
    },

    "auth_callback_logout_404": {
      "style": "Minimal, calm, helpful. Provide next action buttons.",
      "data_testids": {
        "auth_callback": "auth-callback",
        "logout": "logout-page",
        "not_found": "not-found-page"
      }
    }
  },

  "motion_microinteractions": {
    "principles": [
      "Short, functional feedback only (150–220ms).",
      "No scroll hijacking; no long parallax sequences.",
      "Prefer subtle elevation + border shift on hover for cards.",
      "Respect prefers-reduced-motion."
    ],
    "patterns": {
      "buttons": "transition-colors duration-200 + active:scale-[0.98] (only on buttons)",
      "cards": "transition-[border-color,box-shadow] duration-200",
      "nav": "Active item uses small underline bar in accent (2px height)",
      "loading": "Use shadcn Skeleton; avoid spinners everywhere",
      "toasts": "Use Sonner for success/error; keep copy specific"
    }
  },

  "accessibility": {
    "requirements": [
      "WCAG AA contrast: ink on paper; accent used for emphasis only.",
      "Visible focus states: use focus-visible:shadow-[var(--focus-ring)]",
      "All icon buttons require aria-label",
      "Use semantic headings order (H1 once per page)",
      "Provide alt text for editorial images; clarify they are lifestyle context"
    ]
  },

  "image_urls": {
    "editorial_context_only": [
      {
        "category": "home-hero-editorial",
        "url": "https://images.unsplash.com/photo-1595392101500-bd8506242bd0?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "description": "Warm neutral editorial fitness portrait; use as lifestyle context only (never as product)."
      },
      {
        "category": "home-editorial-section",
        "url": "https://images.unsplash.com/photo-1509103438685-4d6682182234?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "description": "Outdoor training context; use for editorial blocks (materials/care/fit guide)."
      }
    ],
    "existing_repo_asset": [
      {
        "category": "legacy-hero-banner-avoid",
        "url": "/hero-banner.png",
        "description": "Existing AI-looking gym banner; avoid using as primary hero in redesign."
      }
    ]
  },

  "instructions_to_main_agent": [
    "Supersede old dark design guide: keep warm paper (#F1EEE8) as global background across all pages.",
    "Do NOT introduce mock products/collections. All product/collection UI must be driven by real API responses; when unavailable, show the catalog_unavailable status block.",
    "Homepage must always include a catalog status block directly below hero (available vs unavailable).",
    "Use Comfortaa everywhere; use Manrope only for dense admin/account UI; Caveat only for tiny signature accents.",
    "Keep burnt orange (#F15A24) reserved for primary actions and meaningful emphasis; never as large backgrounds.",
    "No transparent/glass cards; use white cards with warm borders and soft shadows.",
    "Implement mobile-first: stacked sections, filters in Sheet, sticky summary on desktop only.",
    "Add data-testid to every interactive element and key info (prices, errors, empty states, status blocks).",
    "Use shadcn/ui components from /src/components/ui for dropdowns, dialogs, sheets, accordions, calendar, etc. No raw HTML replacements.",
    "Motion: 150–220ms transitions on colors/shadows only; no transition: all; respect prefers-reduced-motion.",
    "Ensure error states are honest: mention Shopify access error without blaming user; provide Retry and alternative navigation (Blog/Policies)."
  ],

  "appendix_general_ui_ux_design_guidelines": "<General UI UX Design Guidelines>\n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
