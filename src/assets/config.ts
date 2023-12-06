import { Vector2D } from "../pages/map/Point"
import { IPointTypeList } from "./points"

export const API_URL = "http://rxmap.us.to:8100/"
export const DEFAULT_ZONE = "lcz"

const WIDTH_COF = 1.77
export const sizeY = window.innerHeight
export const sizeX = sizeY * WIDTH_COF

export const rawW = 1300
export const rawH = 740
export const PointSize = new Vector2D(13, 13).raw2canvas()

export const pointTypeList: IPointTypeList = {
    "door": {
        "name": "Дверь",
        "desc": "",
        "icon": "/points/door.png"
    },
    "marker": {
        "name": "Точка",
        "desc": "",
        "icon": "/points/marker.png"
    },
    "scp_item": {
        "name": "Камера SCP Предмета",
        "desc": 'Камера с безопасным SCP предметом',
        "icon": "/points/scp_item.png"
    },
    "elevator": {
        "name": "Лифт",
        "desc": '',
        "icon": "/points/elevator.png"
    },
    "spawn_d": {
        "name": "Спавн Класса-Д",
        "desc": 'В этих камерах спавнится персонал Класса-Д',
        "icon": "/points/d_class.png"
    },
    "armory": {
        "name": "Оружейная",
        "desc": 'Оружейная комната',
        "icon": "/points/armory.png"
    }
}