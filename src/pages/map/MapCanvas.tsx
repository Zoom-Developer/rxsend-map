import { Ref, createRef, useEffect } from "react"
import { IZone } from "../../assets/zones"
import { Point, Vector2D } from "./Point"
import { Canvas } from 'react-canvas-typescript'
import React from "react"
import { PointSize, sizeX, sizeY } from "../../assets/config"

export default function MapCanvas({zone, points, onPointClicked, onCanvasClicked}: CanvasProps): React.JSX.Element {

    const divCanvasRef: Ref<HTMLDivElement> = createRef()

    function getMousePos(element: HTMLElement, event: MouseEvent) {
        const rect = element.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function isInside(pos: {x: number, y: number}, rect: {x: number, y: number, width: number, height: number}): boolean {
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    }

    useEffect(() => {

        const divCanvas = divCanvasRef.current
        if (!divCanvas) return

        divCanvas.addEventListener('click', (e: MouseEvent) => {
            const mousePos = getMousePos(divCanvas, e)
            const clickedPoint = points.find(point => isInside(mousePos, {x: point.pos.x, y: point.pos.y, width: PointSize.x, height: PointSize.y}))
            if (onPointClicked) onPointClicked(clickedPoint)
            if (onCanvasClicked && !clickedPoint) {
                onCanvasClicked(e, new Vector2D(mousePos.x - PointSize.x / 2, mousePos.y - PointSize.y / 2))
            }
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [points])

    function drawCanvas(ctx: CanvasRenderingContext2D) {
        const map = new Image()
        map.src = zone.map_file

        ctx.drawImage(map, 0, 0, sizeX, sizeY)

        points.forEach((point: Point) => {
            ctx.drawImage(point.getImage(), point.pos.x, point.pos.y, PointSize.x, PointSize.y)
        })
    }

    return <div ref={divCanvasRef}>
        <Canvas contextType="2d" draw={drawCanvas} style={{height: "100%"}} width={sizeX} height={sizeY} />
    </div>

}

interface CanvasProps {
    zone: IZone,
    points: Point[],
    onPointClicked?: (point?: Point) => void,
    onCanvasClicked?: (e: MouseEvent, pos: Vector2D) => void
}