export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    favorite_id: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }
  
  export interface ApiResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Character[];
  }

  export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[]; // Assuming these are URLs to character resources
    url: string;
    created: string;
    favorite_id: string;
  }
  
  export interface LocationInfo {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Location[];
  }

  export interface FavoriteLocation {
    favorite_id: number;
    item_id: number;
    created_at: string;  // Adjust this type based on your actual date format
}
  export interface FavoriteChars {
    favorite_id: number;
    item_id: number;
    created_at: string;  // Adjust this type based on your actual date format
}