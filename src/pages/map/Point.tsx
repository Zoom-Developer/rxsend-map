import {pointTypeList, rawW, rawH, sizeX, sizeY} from '../../assets/config'

export class PointType {
    type: string
    name: string
    desc: string
    icon: string

    constructor(type: string) {
        this.type = type

        const typeInfo = pointTypeList[type.toString()]
        this.name = typeInfo.name
        this.desc = typeInfo.desc
        this.icon = typeInfo.icon
    }
}

export class Vector2D {
    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    raw2canvas(): Vector2D {
        return new Vector2D(
            (sizeX / rawW) * this.x,
            (sizeY / rawH) * this.y
        )
    }

    canvas2raw(): Vector2D {
        return new Vector2D(
            (rawW / sizeX) * this.x,
            (rawH / sizeY) * this.y
        )
    }

    toJson() {
        return {
            x: this.x,
            y: this.y
        }
    }
}

export class Point {
    id: number
    name: string
    desc: string
    type: PointType
    pos: Vector2D

    constructor(id: number = -1, type: PointType, pos: Vector2D = new Vector2D(), name?: string, desc?: string) {
        this.id = id
        this.name = name || type.name
        this.desc = desc || type.desc
        this.type = type
        this.pos = pos
    }

    getImage(w: number = 64, h: number = 64): HTMLImageElement {
        const img = new Image(w, h)
        img.src = this.type.icon

        return img
    }

    getSyncType(): Point {
        const point = this.duplicate()
        if (point.name == point.type.name) point.name = ""
        if (point.desc == point.type.desc) point.desc = ""
        return point
    }

    duplicate(): Point {
        return new Point(this.id, this.type, this.pos, this.name, this.desc)
    }

    setType(type: PointType) {
        this.type = type
        this.name = this.name || type.name
        this.desc = this.desc || type.desc
    }
}