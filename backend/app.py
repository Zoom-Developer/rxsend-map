from typing import List
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import isAdmin
from schemas import EditPointSchema, PointSchema, Position2D, ZoneSchema, Zones
from db import execute, query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/zones")
async def get_zones() -> List[ZoneSchema]:

    zones = (await query("SELECT * FROM zones")).fetchall()
    return [ZoneSchema(**zone) for zone in await zones]

@app.get("/zones/{zoneId}/points")
async def get_points(zoneId: Zones) -> List[PointSchema]:

    points = (await query("SELECT * FROM points WHERE zone = %s", (zoneId))).fetchall()
    return [PointSchema(
        id = point['id'],
        name = point['name'],
        desc = point['description'],
        type = point['type'],
        pos = Position2D(x = point['pos_x'], y = point['pos_y'])
    ) for point in await points]

@app.put("/points/{pointId}")
async def edit_point(pointId: int, point: EditPointSchema, admin: bool = Depends(isAdmin)) -> int:

    await execute("UPDATE points SET name = %s, description = %s, type = %s, pos_x = %s, pos_y = %s WHERE id = %s", (
        point.name,
        point.desc,
        point.type,
        point.pos.x,
        point.pos.y,
        pointId
    ))

    return 1

@app.post("/zones/{zoneId}/points")
async def create_point(zoneId: Zones, point: EditPointSchema, admin: bool = Depends(isAdmin)) -> int:

    await execute("INSERT INTO points (name, description, type, pos_x, pos_y, zone) VALUES (%s, %s, %s, %s, %s, %s)", (
        point.name,
        point.desc,
        point.type,
        point.pos.x,
        point.pos.y,
        zoneId
    ))

    return 1