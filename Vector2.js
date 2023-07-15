/* 
    Pizaan Maheriyar Tadiwala
    tadiwala@sheridancollege.ca
    14/07/2023
    Description: This file contains the Vector2 class
*/


export class Vector2 {
    constructor(x = 0, y = 0) {
        // member vars
        this.x = x;
        this.y = y;
    }

    // memeber functions
    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    toString() {
        return "Vector2(" + this.x + ", " + this.y + ")";
    }


    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v)
    {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    scale(s)
    {
        this.x *= s;
        this.y *= s;
        return this;
    }

    normalize()
    {
        let xxyy = this.x*this.x + this.y*this.y;
        if(xxyy < 0.000001)
            return this;    // do nothing if it is zero vector

        let invLength = 1.0 / Math.sqrt(xxyy);
        this.x *= invLength;
        this.y *= invLength;
        return this;
    }

}