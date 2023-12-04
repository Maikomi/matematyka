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
        const a = this.get(0) * other.get(0) -
            [1, 2, 3].reduce((sum, i) => sum + this.get(i) * other.get(i), 0);

        const b = this.get(0) * other.get(1) + this.get(1) * other.get(0) +
            this.get(2) * other.get(3) - this.get(3) * other.get(2);

        const c = this.get(0) * other.get(2) + this.get(2) * other.get(0) +
            this.get(3) * other.get(1) - this.get(1) * other.get(3);

        const d = this.get(0) * other.get(3) + this.get(3) * other.get(0) +
            this.get(1) * other.get(2) - this.get(2) * other.get(1);

        return new Quaternion([a, b, c, d]);
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

        const v4 = v1.multiply(-a2).add(v2.multiply(a1)).subtract(new Vector(v3).multiply(1 / (a2 ** 2 + scalarV1V2))).vector;

        return new Quaternion([(a1 * a2 + scalarV1V2) / (a2 ** 2 + scalarV1V2),
            v4[0], v4[1], v4[2]
        ]);
    }

    static rotate(alfa, a, b, c) {
        const ijk = new Vector([a, b, c]).multiply(Math.sin(alfa / 2) / Math.sqrt(a ** 2 + b ** 2 + c ** 2)).vector;
        const q = new Quaternion([Math.cos(alfa / 2), ijk[0], ijk[1], ijk[2]]);
        const qInverse = new Quaternion([Math.cos(alfa / 2), -ijk[0], -ijk[1], -ijk[2]]);

        const inputQuaternion = new Quaternion([0, 1, 1, 1]);

        const outputQuaternion = q.multiply(inputQuaternion).multiply(qInverse);

        return new Vector([outputQuaternion.get(1).toFixed(6), outputQuaternion.get(2).toFixed(6), outputQuaternion.get(3).toFixed(6)]);
    }

    equals(other) {
        return [0, 1, 2, 3].every(i => this.get(i) === other.get(i));
    }
}

const q1 = new Quaternion([0, 1, 0, 0]);
const q2 = new Quaternion([0, 0, 0, 1]);

console.log(q1.toString());
console.log(q1.multiply(q2).toString());

console.log(Quaternion.rotate(Math.PI, 1, 0, 0));

console.log("hejo")