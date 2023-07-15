/* 
    Pizaan Maheriyar Tadiwala
    tadiwala@sheridancollege.ca
    14/07/2023
    Description: This file contains the Line class which is used to create a line object
*/


import { Vector2 } from "./Vector2.js";

export class Line {
    constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        this.point = new Vector2(x1, y1);
        this.direction = new Vector2(x2 - x1, y2 - y1);
    }

    set(x1, y1, x2, y2) {
        this.point.set(x1, y1);
        this.direction.set(x2 - x1, y2 - y1);
        return this;
    }


    isIntersect(line) {
        let det = this.direction.x * line.direction.y - this.direction.y * line.direction.x;
        if (det === 0) {
            return false;
        }
        return true;
    }


    intersect(line) {
        // Calculate determinant
        let det = this.direction.x * line.direction.y - this.direction.y * line.direction.x;

        // Check if the lines are parallel
        if (det === 0) {
            return Vector2(NaN, NaN); // Lines are parallel, no intersection
        }

        // Calculate parameters for the intersection point
        let dx = line.point.x - this.point.x;
        let dy = line.point.y - this.point.y;
        let t1 = (dx * line.direction.y - dy * line.direction.x) / det;
        let t2 = (dx * this.direction.y - dy * this.direction.x) / det;

        // Calculate the intersection point
        let intersectionX = Math.round((this.point.x + t1 * this.direction.x) * 100) / 100;
        let intersectionY = Math.round((this.point.y + t1 * this.direction.y) * 100) / 100;

        // Return the intersection point as a Vector2 object
        return new Vector2(intersectionX, intersectionY);
    }





    getPointX(y) {
        // Calculate t = (y - y1) / (y2 - y1)
        let t = (y - this.point.y) / this.direction.y;

        // Calculate x using x = x1 + t(x2 - x1)
        let x = this.point.x + t * this.direction.x;

        return x;
    }

    getPointY(x) {
        // Calculate t = (x - x1) / (x2 - x1)
        let t = (x - this.point.x) / this.direction.x;

        // Calculate y using y = y1 + t(y2 - y1)
        let y = this.point.y + t * this.direction.y;

        return y;
    }

    toString() {
        return "Line: {" + this.point.x + ", " + this.point.y + "} + t{" + this.direction.x + ", " + this.direction.y + "}";
    }

}