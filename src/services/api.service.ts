import { API_URL } from "../assets/config"
import { IZone } from "../assets/zones"
import { Point, PointType, Vector2D } from "../pages/map/Point"

async function request(endpoint: string, method: string = "GET", json?: object, headers: object = {}) {
    return fetch(API_URL + endpoint, {
        method: method,
        body: json ? JSON.stringify(json) : null,
        headers: {
            ...{
                "Content-Type": "application/json"
            },
            ...headers
        }
    })
}

export const ApiService = {
    async getZones(): Promise<IZone[]> {
        return request("zones", "GET")
        .then(async res => await res.json())
    },

    async getPoints(zone: IZone): Promise<Point[]> {
        return request(`zones/${zone.id}/points`, "GET")
        .then(async res => {
            const rawPoints: getPointResult[] = await res.json()
            const points: Point[] = []
            rawPoints.forEach((point: getPointResult) => {
                points.push(new Point(
                    point.id,
                    new PointType(point.type),
                    new Vector2D(point.pos.x, point.pos.y),
                    point.name,
                    point.desc
                ))
            });
            return points
        })
    },

    async editPoint(point: Point, adminKey: string): Promise<boolean> {
        return request(`points/${point.id}`, "PUT", {
            name: point.name,
            desc: point.desc,
            type: point.type.type.toString(),
            pos: point.pos.canvas2raw().toJson()
        }, {"admin-key": adminKey})
        .then(async res => {
            if (res.status == 403) alert("Неверный админ ключ")
            else if (res.ok) return true

            return false
        })
    },

    async createPoint(zone: IZone, point: Point, adminKey: string): Promise<boolean> {
        return request(`zones/${zone.id}/points`, "POST", {
            name: point.name,
            desc: point.desc,
            type: point.type.type.toString(),
            pos: point.pos.canvas2raw().toJson()
        }, {"admin-key": adminKey})
        .then(async res => {
            if (res.status == 403) alert("Неверный админ ключ")
            else if (res.ok) return true

            return false
        })
    }
}

interface getPointResult {
    id: number,
    name: string,
    desc: string,
    type: string,
    pos: {
        x: number,
        y: number
    }
}