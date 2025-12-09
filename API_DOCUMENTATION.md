# Volus AI - Complete API Documentation

**Base URL:** `http://127.0.0.1:8001/api`

---

## 📦 Products API

### `GET /products/`
List all products with filtering and pagination.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | null | Filter by category |
| `limit` | int | 50 | Max results (1-100) |
| `offset` | int | 0 | Pagination offset |
| `order_by` | string | "trend_score" | Sort field |

**Example Request:**
```bash
GET /api/products/?limit=2&category=electronics
```

**Example Response:**
```json
[
  {
    "id": 1,
    "normalized_name": "Amazon Fire TV Stick HD (Newest gen), free and live TV, Alexa Voice Remote",
    "original_names": ["Amazon Fire TV Stick HD (Newest gen)..."],
    "brand": "Amazon",
    "category": "electronics",
    "trend_status": "emerging",
    "trend_score": 42.2,
    "momentum": 0.0,
    "platforms_count": 1,
    "first_seen": "2025-12-01T10:22:12.963837",
    "last_updated": "2025-12-03T18:47:15.463326"
  }
]
```

---

### `GET /products/{product_id}`
Get a single product by ID.

**Example Request:**
```bash
GET /api/products/1
```

**Example Response:**
```json
{
  "id": 1,
  "normalized_name": "Amazon Fire TV Stick HD...",
  "brand": "Amazon",
  "category": "electronics",
  "trend_status": "emerging",
  "trend_score": 42.2,
  "momentum": 0.0,
  "platforms_count": 1,
  "first_seen": "2025-12-01T10:22:12.963837",
  "last_updated": "2025-12-03T18:47:15.463326"
}
```

---

### `GET /products/{product_id}/insights`
Get comprehensive product insights with platform breakdown, signals, and enrichment data.

**Example Request:**
```bash
GET /api/products/1/insights
```

**Example Response:**
```json
{
  "product": {
    "id": 1,
    "normalized_name": "Amazon Fire TV Stick HD...",
    "brand": "Amazon",
    "category": "electronics",
    "trend_status": "emerging",
    "trend_score": 42.2,
    "momentum": 0.0,
    "platforms": {
      "amazon": true,
      "reddit": false,
      "youtube": false,
      "pinterest": false,
      "meta_ads": false,
      "tiktok": false
    },
    "platforms_count": 1,
    "product_description": "Transform your TV into a smart entertainment hub with the Amazon Fire TV Stick HD...",
    "trend_signals": ["amazon_uk_bestseller", "high_demand", "uk_trending"],
    "market_impact_score": 43.0,
    "uk_availability": "in_stock",
    "price_gbp": 39.99,
    "retailer_mentions": ["Amazon UK"],
    "target_demographic": "Tech-savvy UK households seeking affordable smart home integration",
    "seasonal_relevance": "evergreen",
    "confidence_score": 0.85,
    "enriched_at": "2025-12-03T18:47:15.463314",
    "enrichment_source": "llm_qwen"
  },
  "latest_signals": [],
  "signal_history_count": 0,
  "platform_breakdown": {
    "amazon": true,
    "reddit": false,
    "youtube": false,
    "pinterest": false,
    "meta_ads": false
  }
}
```

---

### `GET /products/{product_id}/signals`
Get aggregated signals for a product from all platforms.

**Example Response:**
```json
{
  "product_id": 1,
  "demand": {
    "score": 75,
    "trend": "rising",
    "sources": ["amazon", "reddit"]
  },
  "trend": {
    "score": 42.2,
    "status": "emerging",
    "momentum": 0.0
  },
  "sentiment": {
    "overall": "positive",
    "score": 0.75
  },
  "platform_scores": {
    "amazon": 80,
    "reddit": 45
  },
  "signal_count": 5,
  "last_updated": "2025-12-03T18:47:15"
}
```

---

### `GET /products/{product_id}/aggregated`
Get cross-platform aggregated data for a product.

**Example Response:**
```json
{
  "product": {...},
  "platforms": {
    "amazon": {
      "rank": 15,
      "rating": 4.5,
      "price": 39.99
    },
    "reddit": {
      "mentions": 120,
      "sentiment": "positive"
    }
  },
  "combined_metrics": {
    "total_mentions": 250,
    "avg_sentiment": 0.72,
    "cross_platform_score": 68
  },
  "trend_analysis": {
    "direction": "rising",
    "strength": 0.65
  },
  "last_updated": "2025-12-03T18:47:15"
}
```

---

## 🔍 Search API

### `POST /search/`
Semantic search for products using natural language.

**Request Body:**
```json
{
  "query": "wireless earbuds for running",
  "category": "electronics",
  "brand": null,
  "min_trend_score": 30,
  "max_results": 20,
  "use_semantic": true
}
```

**Example Response:**
```json
{
  "query": "wireless earbuds for running",
  "query_interpreted": "Wireless earbuds suitable for sports/running activities",
  "intent": "find_product",
  "filters_applied": {
    "category": "electronics",
    "min_trend_score": 30
  },
  "results_count": 5,
  "results": [
    {
      "id": 42,
      "name": "Sony WF-1000XM5 Wireless Earbuds",
      "brand": "Sony",
      "category": "electronics",
      "trend_status": "hot",
      "trend_score": 85.5,
      "momentum": 0.12,
      "platforms_count": 4,
      "relevance_score": 0.95,
      "first_seen": "2025-11-15T08:00:00",
      "last_updated": "2025-12-03T12:00:00"
    }
  ],
  "suggestions": [
    "sport earbuds waterproof",
    "noise cancelling earbuds",
    "Apple AirPods Pro"
  ],
  "response_time_ms": 245
}
```

---

### `GET /search/autocomplete`
Get search autocomplete suggestions.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Partial query (required) |
| `limit` | int | Max suggestions (1-20) |

**Example Request:**
```bash
GET /api/search/autocomplete?q=iphone&limit=5
```

**Example Response:**
```json
{
  "query": "iphone",
  "suggestions": [
    "iPhone 15 Pro Max",
    "iPhone 15 Case",
    "iPhone Charger Cable",
    "iPhone Screen Protector",
    "iPhone Holder Car Mount"
  ]
}
```

---

### `GET /search/trending-queries`
Get popular search queries.

**Example Response:**
```json
{
  "trending_queries": [
    {"query": "wireless earbuds", "count": 1250},
    {"query": "skincare routine", "count": 980},
    {"query": "air fryer", "count": 875}
  ]
}
```

---

### `POST /search/quick`
Quick keyword search without semantic processing (faster).

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Search query |
| `limit` | int | Max results |

**Example Response:**
```json
{
  "query": "laptop",
  "count": 10,
  "results": [
    {"id": 15, "name": "MacBook Pro 16\"", "category": "electronics", "trend_score": 78.5}
  ]
}
```

---

## 📈 Trends API

### `GET /trends/`
Get trending products across all platforms.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | null | Filter by category |
| `limit` | int | 20 | Max results (1-100) |
| `min_score` | float | 50.0 | Minimum trend score |

**Example Request:**
```bash
GET /api/trends/?min_score=30&limit=5
```

**Example Response:**
```json
{
  "category": null,
  "count": 2,
  "products": [
    {
      "id": 1,
      "name": "Amazon Fire TV Stick HD...",
      "brand": "Amazon",
      "category": "electronics",
      "trend_status": "emerging",
      "trend_score": 42.2,
      "momentum": 0.0,
      "platforms_count": 1,
      "platforms": {
        "amazon": true,
        "reddit": false,
        "youtube": false,
        "pinterest": false,
        "meta_ads": false
      }
    }
  ]
}
```

---

### `GET /trends/cross-platform`
Get products trending on multiple platforms.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | null | Filter by category |
| `min_platforms` | int | 2 | Minimum platforms (1-5) |
| `limit` | int | 20 | Max results |

**Example Response:**
```json
{
  "min_platforms_required": 2,
  "count": 15,
  "products": [
    {
      "id": 42,
      "name": "Product X",
      "platforms": ["amazon", "reddit", "youtube"],
      "cross_platform_score": 85.5
    }
  ]
}
```

---

### `GET /trends/by-category/{category}`
Get category-specific trends.

**Example Request:**
```bash
GET /api/trends/by-category/cosmetics
```

**Example Response:**
```json
{
  "category": "cosmetics",
  "category_info": {
    "name": "cosmetics",
    "keywords": ["makeup", "skincare", "lipstick", "foundation"],
    "amazon_mapping": null
  },
  "trending_count": 25,
  "top_products": [
    {
      "id": 100,
      "name": "Rare Beauty Soft Pinch Liquid Blush",
      "trend_status": "hot",
      "trend_score": 92.5,
      "platforms_count": 4
    }
  ],
  "momentum_summary": {
    "rising": 18,
    "stable": 5,
    "declining": 2,
    "avg_momentum": 0.15
  }
}
```

---

### `GET /trends/categories`
List all available product categories.

**Example Response:**
```json
{
  "count": 13,
  "categories": [
    {
      "name": "cosmetics",
      "keywords_sample": ["makeup", "skincare", "lipstick", "foundation", "mascara"],
      "amazon_mapping": null
    },
    {
      "name": "electronics",
      "keywords_sample": ["smartphone", "laptop", "tablet", "headphones", "earbuds"],
      "amazon_mapping": null
    },
    {
      "name": "babies_kids",
      "keywords_sample": ["baby", "toddler", "kids", "children", "infant"],
      "amazon_mapping": null
    }
  ]
}
```

**Available Categories:**
- `cosmetics`
- `electronics`
- `babies_kids`
- `health_wellness`
- `books_literature`
- `automotive`
- `travel_luggage`
- `office_stationery`
- `music_audio`
- `arts_crafts`
- `watches_jewelry`
- `outdoor_camping`
- `home_appliances`

---

### `GET /trends/status-breakdown`
Get distribution of products by trend status.

**Example Response:**
```json
{
  "category": null,
  "total_products": 2683,
  "status_breakdown": {
    "hot": 45,
    "growing": 180,
    "emerging": 520,
    "stable": 1200,
    "cooling": 400,
    "declining": 338
  },
  "status_definitions": {
    "hot": "Rapidly trending with high momentum (score >= 80)",
    "growing": "Consistently increasing in popularity (score 60-79)",
    "emerging": "New product gaining traction (score 40-59)",
    "stable": "Consistent demand, no significant change (score 20-39)",
    "cooling": "Popularity starting to decline (score < 20)",
    "declining": "Significant drop in interest"
  }
}
```

---

### `GET /trends/hot`
Get hottest trending products (score >= 80).

**Example Response:**
```json
{
  "count": 10,
  "hot_products": [
    {
      "id": 42,
      "name": "Dyson Airwrap",
      "brand": "Dyson",
      "category": "cosmetics",
      "trend_score": 95.2,
      "momentum": 0.25,
      "platforms_count": 5
    }
  ]
}
```

---

### `GET /trends/emerging`
Get newly emerging products.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | null | Filter by category |
| `days` | int | 7 | Look back period (1-30) |
| `limit` | int | 20 | Max results |

**Example Response:**
```json
{
  "period_days": 7,
  "category": null,
  "count": 15,
  "emerging_products": [
    {
      "id": 150,
      "name": "New Product Launch",
      "category": "electronics",
      "first_seen": "2025-12-01T08:00:00",
      "trend_score": 55.0,
      "momentum": 0.35
    }
  ]
}
```

---

## 💬 Chat API (AI Assistant)

### `POST /chat/message`
Send a message to the Volus AI assistant.

**Request Body:**
```json
{
  "message": "What are the trending electronics?",
  "user_id": "user123",
  "context": {}
}
```

**Example Response:**
```json
{
  "success": true,
  "response": "As of 2025, trending electronics categories include:\n\n1. **AI-Powered Smart Home Devices**\n   - Voice-controlled hubs, energy-efficient thermostats...\n\n2. **AR/VR Headsets**\n   - High-resolution headsets for gaming...\n\n3. **Foldable Smartphones**\n   - Devices with flexible OLED screens...",
  "timestamp": "2025-12-03T19:49:37.702259",
  "chat_history": [
    {"role": "user", "content": "What are the trending electronics?"},
    {"role": "assistant", "content": "As of 2025, trending electronics..."}
  ],
  "suggestions": [
    "Compare the top 3 trending products",
    "Show me predictions for these products"
  ]
}
```

**Example Chat Messages:**
- "What are the trending products in cosmetics?"
- "Compare iPhone 15 and Samsung Galaxy S24"
- "What's the predicted demand for wireless earbuds?"
- "Show me products similar to Nike Air Max"

---

### `POST /chat/quick-query`
Quick query without conversation context.

**Request Body:**
```json
{
  "query": "top 5 skincare products",
  "category": "cosmetics",
  "platform": "amazon"
}
```

**Example Response:**
```json
{
  "success": true,
  "response": "Here are the top 5 skincare products on Amazon...",
  "timestamp": "2025-12-03T19:50:00"
}
```

---

### `POST /chat/recommend`
Get personalized product recommendations.

**Request Body:**
```json
{
  "preferences": "Looking for sustainable beauty products for sensitive skin",
  "category": "cosmetics",
  "budget": "medium",
  "limit": 10
}
```

**Example Response:**
```json
{
  "success": true,
  "recommendations": "Based on your preferences for sustainable beauty products...\n\n1. **The Ordinary Niacinamide 10% + Zinc 1%** - £5.80\n2. **CeraVe Moisturising Lotion** - £12.50...",
  "timestamp": "2025-12-03T19:51:00"
}
```

---

### `GET /chat/trending`
Get AI-generated trending summary.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | null | Category filter |
| `limit` | int | 10 | Number of products |

**Example Response:**
```json
{
  "success": true,
  "trends": "Here are the top 10 trending products:\n\n**Electronics:**\n- Sony WF-1000XM5 (Score: 92.5)\n...",
  "timestamp": "2025-12-03T19:52:00"
}
```

---

## 🔮 Predictions API

### `GET /predictions/product/{product_id}`
Get trend prediction for a specific product.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `horizon_days` | int | 7 | Days ahead to predict (1-30) |

**Example Request:**
```bash
GET /api/predictions/product/1?horizon_days=14
```

**Example Response:**
```json
{
  "success": true,
  "product_id": 1,
  "prediction_date": "2025-12-17",
  "predicted_demand_score": 68.5,
  "trend_direction": "rising",
  "trend_strength": 0.75,
  "confidence": 0.82,
  "recommendation": "buy_signal",
  "recommendation_reason": "Strong upward momentum with high confidence. Good time to stock up.",
  "model": "lstm",
  "history_days": 30
}
```

**Recommendation Values:**
- `strong_buy` - Excellent opportunity
- `buy_signal` - Good opportunity
- `watch` - Monitor closely
- `caution` - Be careful
- `avoid` - Not recommended

---

### `POST /predictions/batch`
Get predictions for multiple products at once.

**Request Body:**
```json
{
  "product_ids": [1, 5, 10, 15]
}
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `horizon_days` | int | 7 | Days ahead to predict |

**Example Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "product_id": 1,
      "predicted_demand_score": 68.5,
      "trend_direction": "rising",
      "recommendation": "buy_signal"
    },
    {
      "product_id": 5,
      "predicted_demand_score": 45.0,
      "trend_direction": "stable",
      "recommendation": "watch"
    }
  ],
  "generated_at": "2025-12-03T19:55:00"
}
```

---

### `GET /predictions/history/{product_id}`
Get historical data for trend visualization.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `days` | int | 30 | Days of history (1-365) |

**Example Response:**
```json
{
  "product_id": 1,
  "history": [
    {
      "date": "2025-12-01",
      "price": 39.99,
      "rank": 15,
      "rating": 4.5,
      "rating_count": 12500,
      "engagement": 850
    },
    {
      "date": "2025-12-02",
      "price": 39.99,
      "rank": 12,
      "rating": 4.5,
      "rating_count": 12650,
      "engagement": 920
    }
  ],
  "total_days": 30
}
```

---

### `GET /predictions/trending-predictions`
Get trending products with their predictions.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | null | Category filter |
| `limit` | int | 20 | Max results |

---

## 📊 Monitoring API

### `POST /monitoring/configure`
Create a monitoring configuration.

**Request Body:**
```json
{
  "user_id": "user123",
  "name": "My Cosmetics Monitor",
  "sources": ["amazon", "reddit", "youtube"],
  "categories": ["cosmetics"],
  "keywords": ["skincare", "moisturizer"],
  "min_trend_score": 50.0,
  "alert_on_new_hot": true,
  "alert_on_momentum_change": true,
  "run_frequency": "daily"
}
```

**Example Response:**
```json
{
  "id": 1,
  "user_id": "user123",
  "name": "My Cosmetics Monitor",
  "sources_count": 3,
  "sources": ["amazon", "reddit", "youtube"],
  "categories": ["cosmetics"],
  "keywords": ["skincare", "moisturizer"],
  "min_trend_score": 50.0,
  "alert_on_new_hot": true,
  "alert_on_momentum_change": true,
  "is_active": true,
  "created_at": "2025-12-03T20:00:00"
}
```

---

### `GET /monitoring/presets`
Get available source monitoring presets.

**Example Response:**
```json
{
  "presets": {
    "3_sources": {
      "sources": ["amazon", "reddit", "youtube"],
      "description": "Essential monitoring: Major marketplaces and communities",
      "recommended_for": "Small businesses, individual sellers"
    },
    "5_sources": {
      "sources": ["amazon", "reddit", "youtube", "pinterest", "meta_ads"],
      "description": "Standard monitoring: All major platforms",
      "recommended_for": "Growing businesses, brand managers"
    },
    "10_sources": {
      "sources": ["amazon_best_sellers", "amazon_movers", "reddit", "youtube", "pinterest", "meta_ads", "google_trends", "tiktok", "instagram", "twitter"],
      "description": "Advanced monitoring: Social media included",
      "recommended_for": "Marketing teams, mid-size businesses"
    },
    "20_sources": {
      "sources": ["...20 comprehensive sources..."],
      "description": "Comprehensive monitoring: Full market intelligence",
      "recommended_for": "Enterprise, market research teams"
    }
  }
}
```

---

### `GET /monitoring/configs/{user_id}`
Get all monitoring configurations for a user.

---

### `GET /monitoring/alerts/{user_id}`
Get alerts for a user.

**Example Response:**
```json
{
  "alerts": [
    {
      "id": 1,
      "user_id": "user123",
      "alert_type": "new_hot_product",
      "title": "New Hot Product Detected",
      "message": "Product 'Dyson Airwrap' is now trending with score 92.5",
      "product_id": 42,
      "severity": "high",
      "is_read": false,
      "created_at": "2025-12-03T18:30:00"
    }
  ]
}
```

---

## ⚙️ Scrapers API (Admin)

### `GET /scrapers/status`
Get status of all scrapers.

**Example Response:**
```json
{
  "scrapers": {
    "amazon_best_sellers": {
      "description": "Amazon Best Sellers scraper",
      "script_path": "/path/to/amazon_scraper.py",
      "script_exists": true,
      "last_run": "2025-12-03T06:00:00",
      "last_success": true
    },
    "tiktok": {
      "description": "TikTok Creative Center top products scraper (UK)",
      "script_path": "/path/to/top-products.py",
      "script_exists": true,
      "last_run": null,
      "last_success": null
    }
  },
  "available": ["amazon_best_sellers", "amazon_movers", "reddit", "youtube", "pinterest", "meta_ads", "tiktok"]
}
```

---

### `GET /scrapers/scheduler`
Get scheduler status and upcoming tasks.

**Example Response:**
```json
{
  "is_running": true,
  "tasks": {
    "amazon_scrapers": {
      "schedule": "every_6_hours",
      "next_run": "2025-12-04T00:00:00",
      "enabled": true
    },
    "social_scrapers": {
      "schedule": "daily",
      "next_run": "2025-12-04T03:00:00",
      "enabled": true
    }
  }
}
```

---

### `POST /scrapers/run/{scraper_name}`
Run a specific scraper manually.

**Available Scrapers:**
- `amazon_best_sellers`
- `amazon_movers`
- `reddit`
- `youtube`
- `pinterest`
- `meta_ads`
- `tiktok`

**Example Response:**
```json
{
  "message": "Started scraper: tiktok",
  "status": "running",
  "note": "Check /api/scrapers/status for progress"
}
```

---

### `POST /scrapers/run-amazon`
Run both Amazon scrapers.

---

### `POST /scrapers/run-social`
Run all social scrapers (Reddit, YouTube, Pinterest, TikTok).

---

### `POST /scrapers/enrich/{product_id}`
Enrich a single product with LLM analysis.

**Example Response:**
```json
{
  "success": true,
  "product_id": 1,
  "enriched_fields": {
    "product_description": "Transform your TV into a smart entertainment hub...",
    "trend_signals": ["amazon_uk_bestseller", "high_demand"],
    "market_impact_score": 43.0,
    "uk_availability": "in_stock",
    "target_demographic": "Tech-savvy UK households"
  }
}
```

---

### `POST /scrapers/enrich-all`
Enrich all products in background.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `batch_size` | int | 50 | Products per batch |
| `skip_enriched` | bool | true | Skip already enriched |
| `category` | string | null | Filter by category |

---

### `GET /scrapers/enrich-status`
Get enrichment progress status.

---

## 🏠 Other Endpoints

### `GET /`
Root endpoint.

**Example Response:**
```json
{
  "name": "Volus AI",
  "version": "1.0.0",
  "description": "Product Intelligence Platform",
  "docs": "/docs",
  "status": "running"
}
```

---

### `GET /health`
Health check endpoint.

**Example Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "llm": "available"
}
```

---

## 📋 Trend Signals Reference

| Signal | Weight | Description |
|--------|--------|-------------|
| `viral_tiktok` | 2.0 | Viral on TikTok |
| `viral_instagram` | 1.8 | Viral on Instagram |
| `viral_youtube` | 1.8 | Viral on YouTube |
| `short_form_video` | 1.6 | Trending in short-form video |
| `google_trend_spike` | 1.7 | Google Trends spike |
| `search_spike` | 1.5 | Search volume spike |
| `creator_collab` | 1.6 | Creator collaboration |
| `influencer_backed` | 1.2 | Influencer endorsed |
| `celebrity_endorsed` | 1.5 | Celebrity endorsed |
| `dupe_alert` | 1.7 | Popular dupe product |
| `sold_out` | 1.8 | Frequently sold out |
| `restock_alert` | 1.2 | Restock alerts |
| `waitlist` | 1.5 | Has waitlist |
| `limited_edition` | 1.5 | Limited edition |
| `new_launch` | 1.2 | Recently launched |
| `award_winning` | 1.3 | Award winning |
| `editor_pick` | 1.1 | Editor's choice |
| `high_demand` | 1.4 | High demand indicator |
| `uk_trending` | 1.4 | Trending in UK |
| `amazon_uk_bestseller` | 1.5 | Amazon UK bestseller |

---

## 📦 TypeScript Types

```typescript
interface Product {
  id: number;
  normalized_name: string;
  original_names: string[];
  brand: string | null;
  category: string | null;
  trend_status: 'hot' | 'growing' | 'emerging' | 'stable' | 'cooling' | 'declining' | 'unknown';
  trend_score: number;
  momentum: number;
  platforms_count: number;
  first_seen: string;
  last_updated: string;
}

interface ProductInsights {
  product: ProductDetail;
  latest_signals: Signal[];
  signal_history_count: number;
  platform_breakdown: PlatformBreakdown;
}

interface ProductDetail extends Product {
  platforms: {
    amazon: boolean;
    reddit: boolean;
    youtube: boolean;
    pinterest: boolean;
    meta_ads: boolean;
    tiktok: boolean;
  };
  product_description: string;
  trend_signals: string[];
  market_impact_score: number;
  uk_availability: string;
  price_gbp: number;
  retailer_mentions: string[];
  target_demographic: string;
  seasonal_relevance: string;
  confidence_score: number;
  enriched_at: string;
  enrichment_source: string;
}

interface SearchRequest {
  query: string;
  category?: string;
  brand?: string;
  min_trend_score?: number;
  max_results?: number;
  use_semantic?: boolean;
}

interface SearchResponse {
  query: string;
  query_interpreted: string;
  intent: string;
  filters_applied: Record<string, any>;
  results_count: number;
  results: SearchResult[];
  suggestions: string[];
  response_time_ms: number;
}

interface TrendingResponse {
  category: string | null;
  count: number;
  products: TrendingProduct[];
}

interface ChatRequest {
  message: string;
  user_id?: string;
  context?: Record<string, any>;
}

interface ChatResponse {
  success: boolean;
  response: string;
  timestamp: string;
  chat_history?: ChatMessage[];
  suggestions?: string[];
}

interface Prediction {
  success: boolean;
  product_id: number;
  prediction_date: string;
  predicted_demand_score: number;
  trend_direction: 'rising' | 'stable' | 'falling';
  trend_strength: number;
  confidence: number;
  recommendation: 'strong_buy' | 'buy_signal' | 'watch' | 'caution' | 'avoid';
  recommendation_reason: string;
  model: string;
  history_days: number;
}
```

---

## 🔗 Swagger Documentation

Interactive API docs available at:
- **Swagger UI:** `http://127.0.0.1:8001/docs`
- **ReDoc:** `http://127.0.0.1:8001/redoc`
