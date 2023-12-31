class Vector {
    constructor(iterable) {
        this.vector = iterable;
    }

    crossProduct(other) {
        const x = this.vector[1] * other.vector[2] - this.vector[2] * other.vector[1];
        const y = this.vector[2] * other.vector[0] - this.vector[0] * other.vector[2];
        const z = this.vector[0] * other.vector[1] - this.vector[1] * other.vector[0];
        return new Vector([x, y, z]);
    }

    dotProduct(other) {
        return this.vector.reduce((acc, val, idx) => acc + val * other.vector[idx], 0);
    }

    multiply(scalar) {
        return new Vector(this.vector.map(val => val * scalar));
    }

    add(other) {
        return new Vector(this.vector.map((val, idx) => val + other.vector[idx]));
    }

    subtract(other) {
        return new Vector(this.vector.map((val, idx) => val - other.vector[idx]));
    }

    divide(scalar) {
        if (scalar === 0) {
            throw new Error('Division by zero is not allowed.');
        }
        return new Vector(this.vector.map(val => val / scalar));
    }

    normalize() {
        const magnitude = Math.sqrt(this.vector.reduce((sum, val) => sum + val ** 2, 0));
        return new Vector(this.vector.map(val => val / magnitude));
    }
}

class Quaternion {
    constructor(iterable) {
        this.quaternion = iterable;
    }

    get(i) {
        return this.quaternion[i];
    }

    toString() {
        return `${this.get(0)} + ${this.get(1)}i + ${this.get(2)}j + ${this.get(3)}k`;
    }

    multiply(other) {
        const v1 = new Vector([this.get(1), this.get(2), this.get(3)]);
        const v2 = new Vector([other.get(1), other.get(2), other.get(3)]);

        const a = this.get(0) * other.get(0) - v1.dotProduct(v2);

        const v3 = v2.multiply(this.get(0)).add(v1.multiply(other.get(0))).add(v1.crossProduct(v2)).vector;

        return new Quaternion([a, v3[0], v3[1], v3[2]]);
    }


    add(other) {
        return new Quaternion([0, 1, 2, 3].map(i => this.get(i) + other.get(i)));
    }

    subtract(other) {
        return new Quaternion([0, 1, 2, 3].map(i => this.get(i) - other.get(i)));
    }

    matrixMultiply(other) {
        const a1 = this.get(0);
        const a2 = other.get(0);

        const v1 = new Vector([this.get(1), this.get(2), this.get(3)]);
        const v2 = new Vector([other.get(1), other.get(2), other.get(3)]);

        const v3 = v1.multiply(a2).add(v2.multiply(a1)).add(v1.crossProduct(v2)).vector;

        return new Quaternion([a1 * a2 - v1.dotProduct(v2), v3[0], v3[1], v3[2]]);
    }

    divide(other) {
        const a1 = this.get(0);
        const a2 = other.get(0);

        const v1 = new Vector([this.get(1), this.get(2), this.get(3)]);
        const v2 = new Vector([other.get(1), other.get(2), other.get(3)]);

        const scalarV1V2 = v1.dotProduct(v2);

        if (a2 ** 2 + scalarV1V2 === 0) {
            throw new Error('The necessary condition for quaternion division is not satisfied');
        }

        const v3 = v1.crossProduct(v2).vector;

        const v4 = v1.multiply(-a2).add(v2.multiply(a1)).subtract(new Vector(v3).divide(a2 ** 2 + scalarV1V2)).vector;

        return new Quaternion([(a1 * a2 + scalarV1V2) / (a2 ** 2 + scalarV1V2), v4[0], v4[1], v4[2]]);
    }

    static rotate(angle, axis, point) {
        const halfAngle = angle / 2;
        const sinHalfAngle = Math.sin(halfAngle);
        const cosHalfAngle = Math.cos(halfAngle);

        const normalizedAxis = new Vector(axis).normalize().vector;

        const ijk = new Vector(normalizedAxis).multiply(sinHalfAngle).vector;
        const q = new Quaternion([cosHalfAngle, ijk[0], ijk[1], ijk[2]]);
        const qInverse = new Quaternion([cosHalfAngle, -ijk[0], -ijk[1], -ijk[2]]);

        const rotatedQuaternion = q.multiply(new Quaternion([0, point.vector[0], point.vector[1], point.vector[2]])).multiply(qInverse);

        const rotatedVector = new Vector([
            rotatedQuaternion.get(1),
            rotatedQuaternion.get(2),
            rotatedQuaternion.get(3)
        ]);

        return rotatedVector;
    }


    equals(other) {
        return [0, 1, 2, 3].every(i => this.get(i) === other.get(i));
    }
}

const q1 = new Quaternion([0, 1, 0, 0]);
const q2 = new Quaternion([0, 0, 0, 1]);

console.log("Quaterions:");
console.log(q1.toString());
console.log(q2.toString());


console.log("Zadanie");

console.log("Obrót punktu [-1,-1,-1] o 270 stopni");

const pointToRotate = new Vector([-1, -1, -1]);
const rotationAngle = (270 * Math.PI) / 180;
const rotationAxis = [1, 0, 0];

const rotatedVector = Quaternion.rotate(rotationAngle, rotationAxis, pointToRotate);

console.log("Obrócony punkt:", rotatedVector.vector);


console.log("Brak przemienności mnożenia kwaternionów");
console.log("q1 mnożone przez q2:");
const q1q2 = q1.multiply(q2);
console.log(q1q2.toString());
console.log("q2 mnożone przez q1:");
const q2q1 = q2.multiply(q1);
console.log(q2q1.toString());