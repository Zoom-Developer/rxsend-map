import { ApiService } from '../../services/api.service'
import MapCanvas from "./MapCanvas"
import style from './Map.module.css'
import { Point } from "./Point"
import { Ref, createRef, useEffect, useState } from "react"
import { IZone } from '../../assets/zones'
import Admin from './Admin'
import { PointInfo } from './PointInfo/PointInfo'
import { DEFAULT_ZONE } from '../../assets/config'

export default function Map() {

    const params = new URLSearchParams(document.location.search)

    const mapRef: Ref<HTMLDivElement> = createRef()
    const [mapEl, setMapEl] = useState<HTMLDivElement>()

    const [zones, setZones] = useState<IZone[]>([])
    const [zone, setZone] = useState<IZone>()
    const [points, setPoints] = useState<Point[]>([])
    const [selectedPoint, setSelectedPoint] = useState<Point>()

    useEffect(() => {

        async function getInfo() {
            ApiService.getZones().then(zones => {
                const currentZone = zones.find(zone => zone.id == document.location.pathname.slice(1)) || zones.find(zone => zone.id == DEFAULT_ZONE)
                // @ts-expect-error:next-line
                changeZone(currentZone)
                setZones(zones)
            })
        }

        getInfo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // @ts-expect-error:next-line
        if (mapRef.current) setMapEl(mapRef.current.firstChild)
    }, [mapRef])

    async function getPoints() {
        if (!zone) return
        setPoints([])
        ApiService.getPoints(zone).then(points => {
            points.forEach(point => {
                point.pos = point.pos.raw2canvas()
            })
            setPoints(points)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getPoints()}, [zone])

    function changeZone(zone: IZone) {
        if (!params.get("admin")) window.history.replaceState(null, '', zone.id)
        setZone(zone)
    }

    if (zone) {
        if (params.get("admin")) return <Admin zone={zone} points={points} updatePoints={getPoints} />
        return <>
            <div className={style.header}>
                {
                    zones.map(zone => (
                        <span key={zone.id} onClick={() => changeZone(zone)}>{zone.name}</span>
                    ))
                }
            </div>
            <div className={style.map} ref={mapRef}>
                <MapCanvas zone={zone} points={points} onPointClicked={setSelectedPoint} />
            </div>
            {selectedPoint && mapEl && 
                <PointInfo point={selectedPoint} canvas={mapEl} />
            }
        </>
    }
    
}