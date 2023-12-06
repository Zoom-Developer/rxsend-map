import aiomysql
from aiomysql.cursors import DictCursor
from contextlib import asynccontextmanager

async def createPool() -> aiomysql.Pool:

    pool = await aiomysql.create_pool(
        host = "127.0.0.1",
        user = "user",
        password = "password",
        db = "db"
    )

    return pool

@asynccontextmanager
async def getPoll() -> aiomysql.Pool:
    pool = await createPool()
    try:
        yield pool
    finally:
        pool.close()
        await pool.wait_closed()

async def query(sql: str, args: tuple = tuple()) -> DictCursor:

    async with getPoll() as poll:
        async with poll.acquire() as conn:
            async with conn.cursor(DictCursor) as cur:
                await cur.execute(sql, args)
                await cur.close()

                return cur
            
async def execute(sql: str, args: tuple = tuple()) -> DictCursor:

    async with getPoll() as poll:
        async with poll.acquire() as conn:
            async with conn.cursor(DictCursor) as cur:
                await cur.execute(sql, args)
                await conn.commit()
                await cur.close()

                return cur
            

# --------------------------------------------------------------------------------------------
# Код заимствован и адаптирован из личного проекта разработчика Note Store (Мой конспект)
# --------------------------------------------------------------------------------------------