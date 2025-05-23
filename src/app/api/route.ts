import { NextResponse } from 'next/server'
import React from 'react'

export default function GET() {
    return NextResponse.json([
        {id : 1, 'name' : '田中'},
        {id : 2, 'name' : '山田'}
    ])
}
