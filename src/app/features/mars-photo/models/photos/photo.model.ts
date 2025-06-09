import { PhotoCamera } from "./photo-camera.model"
import { PhotoRover } from "./photo-rover.model"

export interface Photo {
    id: number
    sol: number
    camera: PhotoCamera
    img_src: string
    earth_date: string
    rover: PhotoRover
}