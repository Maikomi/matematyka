class Vector {
    constructor(x,y,z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    vectorLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalization() {
        let length = this.vectorLength();
        return new Vector(this.x/length , this.y/length, this.z/length);
    }
}

const add = (v1, v2) => {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

const subtract = (v1, v2) => {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
} 

//mnożenie przez skalar
const multiplyScalar = (v1, scalar) => {
    return new Vector(v1.x * scalar, v1.y * scalar, v1.z * scalar)
}

//iloczyn skalarny
const dotProduct = (v1, v2) => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}

//iloczyn wektorowy
const crossProduct = (v1, v2) => {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x; 
    return new Vector(x, y, z);
}

const angleBetweenV = (v1, v2) => {
    dot = dotProduct(v1, v2);
    len1 = v1.vectorLength();
    len2 = v2.vectorLength();
    const angleInRadians = Math.acos(dot/(len1 * len2));
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
    return angleInDegrees;
}

const v1 = new Vector(1,1,1);
const v2 = new Vector(1, 2, 3);
let sum = add(v1,v2);
let sub = subtract(v1, v2);
let multi = multiplyScalar(v1, 3);
console.log("sum: ", sum);
console.log("sub; ", sub);
console.log("multiScal: ", multi);
console.log("dot: ", dotProduct(v1, v2));
console.log("length: ", v1.vectorLength());
console.log("normalize: ", v1.normalization());
console.log("corss1: ", crossProduct(v1, v2));
console.log("corss1: ", crossProduct(v2, v1));
console.log("angle: ", angleBetweenV(v1, v2));

console.log("Zadanie 1")
const v3 = new Vector(0, 3, 0);
const v4 = new Vector(5, 5, 0);
console.log("Kąt: ", angleBetweenV(v3, v4));
const v5 = new Vector(4, 5, 1);
const v6 = new Vector(4, 1, 3);

console.log("Wektor prostopadły: ", crossProduct(v5, v6));
console.log("Normalizacja: ", crossProduct(v5, v6).normalization());
