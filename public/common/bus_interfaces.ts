export interface coach {
    coachId: number;
    coachName: string;
  }
  
export  interface coachBrands {
    coachId: number;
    coachName: string;
    brandList: string[];
  }
  
  export interface brandData {
    layout: number[][];
    numBus: number;
  }