import { PexelsPhoto } from "../../api/pexelsApi/pexelsInterfaces";


export interface Gallery {
    columnsCount: number,
    photos: PexelsPhoto[],
    
}