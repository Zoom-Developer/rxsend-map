import { createRef, useCallback, useEffect, useState } from "react"
import { IZone } from '../../assets/zones'
import { Point, PointType, Vector2D } from './Point'
import mapStyle from './Map.module.css'
import MapCanvas from "./MapCanvas"
import { PointEdit } from "./PointInfo/PointInfo"
import { ApiService } from "../../services/api.service"

export default function Admin({zone, points, updatePoints}: AdminProps) {

    const params = new URLSearchParams(document.location.search)
    const adminKey = params.get("admin") || ""

    const mapRef = createRef<HTMLDivElement>()
    const [mapEl, setMapEl] = useState<HTMLDivElement>()
    const [selectedPoint, setSelectedPoint] = useState<Point>()

    const editPoint = useCallback((point: Point) => {

        ApiService.editPoint(point.getSyncType(), adminKey)
        .then(res => {
            if (res) updatePoints()
            setSelectedPoint(undefined)
        })

    }, [adminKey, updatePoints])

    const createPoint = useCallback((point: Point) => {

        ApiService.createPoint(zone, point.getSyncType(), adminKey)
        .then(res => {
            if (res) updatePoints()
            setSelectedPoint(undefined)
        })

    }, [zone, adminKey, updatePoints])

    const openCreatePoint = useCallback((e: MouseEvent, pos: Vector2D) => {

        if (e.shiftKey) {
            const point = new Point(undefined, new PointType("marker"), pos, undefined, undefined);
            setSelectedPoint(point);
        }

    }, []);

    useEffect(() => {
        if (mapRef.current) {
            // @ts-expect-error:next-line
            const map: HTMLDivElement = mapRef.current.firstChild
            setMapEl(map)
        }
    }, [mapRef])

    return <>
        <div className={mapStyle.map} ref={mapRef}>
            <MapCanvas zone={zone} points={points} onPointClicked={setSelectedPoint} onCanvasClicked={(e, pos) => openCreatePoint(e, pos)} />
        </div>
        {selectedPoint && mapEl &&
            <PointEdit point={selectedPoint} canvas={mapEl} onCancel={() => setSelectedPoint(undefined)} onContinue={selectedPoint.id != -1 ? editPoint : createPoint} />
        }
    </>
}

interface AdminProps {
    zone: IZone,
    points: Point[],
    updatePoints: () => void
}