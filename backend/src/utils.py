from fastapi import HTTPException, Header

ADMIN_KEY = "123ZoOm123RxMaP"

async def isAdmin(admin_key: str = Header()) -> bool:

    if admin_key != ADMIN_KEY: raise HTTPException(403)

    return True