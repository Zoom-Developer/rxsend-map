from enum import Enum
from typing import Optional
import pydantic as pd

# ---------------------------------
# // OUT
# ---------------------------------

class ZoneSchema(pd.BaseModel):

    id: str
    name: str
    map_file: str

class Position2D(pd.BaseModel):

    x: float
    y: float

class PointSchema(pd.BaseModel):

    id: int
    name: Optional[str]
    desc: Optional[str]
    type: str
    pos: Position2D   

# ---------------------------------
# // IN
# ---------------------------------

class EditPointSchema(pd.BaseModel):

    name: str
    desc: str
    type: str
    pos: Position2D

# ---------------------------------
# // OTHER
# ---------------------------------

class Zones(str, Enum):

    LCZ = "lcz"
    HCZ = "hcz"
    EZ = "ez"
    BS = "bs"
    OS = "os"
