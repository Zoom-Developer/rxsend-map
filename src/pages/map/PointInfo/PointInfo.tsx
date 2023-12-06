import { CSSProperties, ChangeEvent, createRef, useEffect, useState } from "react"
import { Point, PointType } from "../Point"
import ReactHtmlParser from 'react-html-parser'
import style from './PointInfo.module.css'
import { PointSize, pointTypeList } from "../../../assets/config"

function getPanelStyle(panelRect: DOMRect, canvas: HTMLDivElement | HTMLCanvasElement, point: Point): CSSProperties {

    let top = canvas.offsetTop + point.pos.y - (panelRect?.height || 0) + PointSize.y;
    if (top - canvas.offsetTop < 0) top = canvas.offsetTop + point.pos.y + PointSize.y;

    return {
        top: top - PointSize.y,
        left: canvas.offsetLeft + point.pos.x + PointSize.x,
        opacity: 1
    }
}

export function PointInfo({point, canvas}: PointInfoProps): JSX.Element {

    const panelRef = createRef<HTMLDivElement>()
    const [panelStyle, setPanelStyle] = useState<React.CSSProperties>()

    useEffect(() => {
        
        const panelRect = panelRef.current?.getBoundingClientRect()
        console.log(panelRef.current?.getBoundingClientRect())
        if (!panelRect) return

        setPanelStyle(getPanelStyle(panelRect, canvas, point))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelRef.current?.getBoundingClientRect()])

    return <div className={style['point-info']} style={panelStyle} ref={panelRef}>
        <div className={style.name}>{point.name}</div>
        <div className={style.desc}>{ReactHtmlParser(point.desc.replace("\n", "<br/>"))}</div>
    </div>

}

export function PointEdit({point, canvas, onContinue = () => {}, onCancel = () => {}}: PointEditProps): JSX.Element {

    const panelRef = createRef<HTMLDivElement>()
    const [panelStyle, setPanelStyle] = useState<React.CSSProperties>()

    const [name, setName] = useState<string>(point.name)
    const [desc, setDesc] = useState<string>(point.desc)
    const [type, setType] = useState<PointType>(point.type)

    useEffect(() => {
        if (!point) return
        setName(point.name)
        setDesc(point.desc)
        setType(point.type)
    }, [point])

    useEffect(() => {
        
        const panelRect = panelRef.current?.getBoundingClientRect()
        if (!panelRect) return

        setPanelStyle(getPanelStyle(panelRect, canvas, point))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelRef.current?.getBoundingClientRect(), point])

    function onChangeType(e: ChangeEvent<HTMLSelectElement>) {
        const newType = new PointType(e.target.value)
        setName((name == type.name && newType.name) ? newType.name : name)
        setDesc((desc == type.desc && newType.desc) ? newType.desc : desc)
        setType(newType)
    }
    
    return <div className={`${style['point-info']} ${style['point-edit']}`} style={panelStyle} ref={panelRef}>
        <input className={style.name} value={name} onChange={e => setName(e.target.value)} placeholder={point.name} />
        <textarea rows={5} className={desc} value={desc} onChange={e => setDesc(e.target.value)} placeholder={point.desc} />
        <select value={type.type.toString()} onChange={onChangeType}>
            {Object.entries(pointTypeList).map(([typeName, typeData]) => (
                <option key={typeName} value={typeName}>{typeData.name}</option>
            ))}
        </select>
        <div className={style.buttons}>
            <button onClick={() => {
                onContinue(new Point(point.id, type, point.pos, name, desc))
            }}>Сохранить</button>
            <button onClick={onCancel}>Отменить</button>
        </div>
    </div>


}

interface PointInfoProps {
    point: Point,
    canvas: HTMLCanvasElement | HTMLDivElement
}

interface PointEditProps extends PointInfoProps {
    onContinue?: (point: Point) => void,
    onCancel?: () => void
}