class SqrMatrix{
    constructor(n) {
        this.data = new Array(n);
        for (let i = 0; i < n; i++) {
            this.data[i] = new Array(n).fill(0);
        }
    }

    // Ustawienie wartości w macierzy
    setValue(row, col, value) {
        let n = this.getSize()
        if (row >= 0 && row < n && col >= 0 && col < n) {
            this.data[row][col] = value;
        } else {
            throw new Error("Invalid row or column index");
        }
    }

    // Pobranie wartości z macierzy
    getValue(row, col) {
        let n = this.getSize();
        if (row >= 0 && row < n && col >= 0 && col < n) {
            return this.data[row][col];
        } else {
            throw new Error("Invalid row or column index");
        }
    }

    //pobranie rozmiaru macierzy
    getSize(){
        return this.data.length;
    }

    // Wyświetlenie macierzy
    print() {
        let n = this.getSize()
        for (let i = 0; i < n; i++) {
            console.log(this.data[i].join(" "));
        }
    }

    cofactor(row, col) {
        const n = this.getSize();
        const minorMatrix = new SqrMatrix(n - 1);

        for (let i = 0, minorRow = 0; i < n; i++) {
            if (i === row) continue;
            for (let j = 0, minorCol = 0; j < n; j++) {
                if (j === col) continue;
                minorMatrix.setValue(minorRow, minorCol, this.getValue(i, j));
                minorCol++;
            }
            minorRow++;
        }

        // Obliczamy wyznacznik minorMatrix
        return minorMatrix.determinant();
    }

    // Metoda zwracająca macierz dopełnień
    getAdjointMatrix() {
        const n = this.getSize();
        const adjointMatrix = new SqrMatrix(n);
    
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const cofactorValue = this.cofactor(i, j);
                const sign = ((i + j) % 2 === 0) ? 1 : -1; // Poprawiony znak
                adjointMatrix.setValue(i, j, sign * cofactorValue);
            }
        }
        return adjointMatrix;
    }
    

    determinant() {
        const n = this.getSize();
    
        if (n === 1) {
            return this.getValue(0, 0);
        }

        if (n === 2) {
            return this.getValue(0, 0) * this.getValue(1, 1) - this.getValue(0, 1) * this.getValue(1, 0);
        }
    
        let det = 0;
        for (let j = 0; j < n; j++) {
            if (this.getValue(0, j) !== 0) {
                let matrix = new SqrMatrix(n - 1);
                let sign = (j % 2 === 0) ? 1 : -1;
    
                for (let i = 1; i < n; i++) {
                    let col = 0;
                    for (let k = 0; k < n; k++) {
                        if (k === j) continue;
                        matrix.setValue(i - 1, col, this.getValue(i, k));
                        col++;
                    }
                }
    
                det += sign * this.getValue(0, j) * matrix.determinant();
            }
        }
    
        return det;
    }

}


//dodawanie,odejmowanie,mnożenie przez skalar,mnożenie macierzy, transpozycja, translacja, skalowanie, obroty,

// Dodawanie macierzy
const addMatrices = (m1, m2) => {
    let m1size = m1.getSize();
    let m2size = m2.getSize();

    if (m1size === m2size) {
        let m3 = new SqrMatrix(m1size);
        for (let i = 0; i < m1size; i++) {
            for (let j = 0; j < m1size; j++) {
                m3.setValue(i, j, m1.getValue(i, j) + m2.getValue(i, j));
            }
        }
        return m3;
    } else {
        console.log("Macierze mają różne rozmiary!");
        return null;
    }
}

// Odejmowanie macierzy
const substractMatrices = (m1, m2) => {
    let m1size = m1.getSize();
    let m2size = m2.getSize();

    if (m1size === m2size) {
        let m3 = new SqrMatrix(m1size);
        for (let i = 0; i < m1size; i++) {
            for (let j = 0; j < m1size; j++) {
                m3.setValue(i, j, m1.getValue(i, j) - m2.getValue(i, j));
            }
        }
        return m3;
    } else {
        console.log("Macierze mają różne rozmiary!");
        return null;
    }
}

const multiplayByScalar = (m1, scalar) => {
    let m1size = m1.getSize();

        let m3 = new SqrMatrix(m1size);
        for (let i = 0; i < m1size; i++) {
            for (let j = 0; j < m1size; j++) {
                m3.setValue(i, j, m1.getValue(i, j) * scalar);
            }
        }
        return m3;

    }

const multiplyMatrices = (m1, m2) => {
    let m1size = m1.getSize();
    let m2size = m2.getSize();

    if (m1size === m2size) {
        let result = new SqrMatrix(m1size);
        for (let i = 0; i < m1size; i++) {
            for (let j = 0; j < m1size; j++) {
                let sum = 0;
                for (let k = 0; k < m1size; k++) {
                    sum += m1.getValue(i,k) * m2.getValue(k, j);
                }
                result.setValue(i, j, sum);
            }
        }
        return result;
    } else {
        console.log("Macierze mają różne rozmiary!");
        return null;
    }
}


const transposeMatrix = (m1) => {
    let m1size = m1.getSize();
    const result = new SqrMatrix(m1size);

    for (let i = 0; i < m1size; i++) {
        for (let j = 0; j < m1size; j++) {
            result.setValue(j, i, m1.getValue(i, j));
        }
    }

    return result;
}

const inverseMatrix = (m1) => {
    let n = m1.getSize();
    if (n < 2) {
        throw new Error("Matrix is too small to have an inverse");
    }

    let m2 = m1.getAdjointMatrix(); // Oblicz macierz dopełnień
    let det = m1.determinant();
    
    if (det === 0) {
        throw new Error("Matrix is singular, no inverse exists");
    }
    
    let result = new SqrMatrix(n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result.setValue(i, j, m2.getValue(i, j) / det); // Podziel każdy element macierzy dopełnień przez wyznacznik
        }
    }

    return transposeMatrix(result);
}

//translacja macierzy
const translateMatrix = (m1, dx, dy, dz) => {
    const n = m1.getSize();

    if (n === 3) {
        // Translacja dla macierzy 3x3
        const translationMatrix = new SqrMatrix(3);
        translationMatrix.setValue(0, 0, 1);
        translationMatrix.setValue(1, 1, 1);
        translationMatrix.setValue(2, 2, 1);
        translationMatrix.setValue(0, 2, dx);
        translationMatrix.setValue(1, 2, dy);

        return multiplyMatrices(m1, translationMatrix);
    } else if (n === 4) {
        // Translacja dla macierzy 4x4 (3D)
        const translationMatrix = new SqrMatrix(4);
        translationMatrix.setValue(0, 0, 1);
        translationMatrix.setValue(1, 1, 1);
        translationMatrix.setValue(2, 2, 1);
        translationMatrix.setValue(3, 3, 1);
        translationMatrix.setValue(0, 3, dx);
        translationMatrix.setValue(1, 3, dy);
        translationMatrix.setValue(2, 3, dz);

        return multiplyMatrices(m1, translationMatrix);
    } else {
        console.log("Translacja dostępna tylko dla macierzy 3x3 i 4x4");
        return null;
    }
}

//Skalowanie macierzy
const scaleMatrix = (m1, scaleX, scaleY, scaleZ) => {
    const n = m1.getSize();

    if (n === 3) {
        // Skalowanie dla macierzy 3x3
        const scalingMatrix = new SqrMatrix(3);
        scalingMatrix.setValue(0, 0, scaleX);
        scalingMatrix.setValue(1, 1, scaleY);
        scalingMatrix.setValue(2, 2, scaleZ);

        return multiplyMatrices(m1, scalingMatrix);
    } else if (n === 4) {
        // Skalowanie dla macierzy 4x4 (3D)
        const scalingMatrix = new SqrMatrix(4);
        scalingMatrix.setValue(0, 0, scaleX);
        scalingMatrix.setValue(1, 1, scaleY);
        scalingMatrix.setValue(2, 2, scaleZ);
        scalingMatrix.setValue(3, 3, 1);

        return multiplyMatrices(m1, scalingMatrix);
    } else {
        console.log("Skalowanie dostępne tylko dla macierzy 3x3 i 4x4");
        return null;
    }
}

//Obroty macierzy
const rotateMatrix = (m1, angleX, angleY, angleZ) => {
    const n = m1.getSize();

    if (n === 3) {
        // Obracanie macierzy 3x3 wokół osi Z
        const rotationMatrix = new SqrMatrix(3);
        const cosZ = Math.cos(angleZ);
        const sinZ = Math.sin(angleZ);

        rotationMatrix.setValue(0, 0, cosZ);
        rotationMatrix.setValue(0, 1, -sinZ);
        rotationMatrix.setValue(1, 0, sinZ);
        rotationMatrix.setValue(1, 1, cosZ);
        rotationMatrix.setValue(2, 2, 1);

        return multiplyMatrices(m1, rotationMatrix);
    } else if (n === 4) {
        // Obracanie macierzy 4x4 (3D) wokół osi X, Y, Z
        const rotationX = new SqrMatrix(4);
        const rotationY = new SqrMatrix(4);
        const rotationZ = new SqrMatrix(4);

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosZ = Math.cos(angleZ);
        const sinZ = Math.sin(angleZ);

        rotationX.setValue(0, 0, 1);
        rotationX.setValue(1, 1, cosX);
        rotationX.setValue(1, 2, -sinX);
        rotationX.setValue(2, 1, sinX);
        rotationX.setValue(2, 2, cosX);
        rotationX.setValue(3, 3, 1);

        rotationY.setValue(0, 0, cosY);
        rotationY.setValue(0, 2, sinY);
        rotationY.setValue(1, 1, 1);
        rotationY.setValue(2, 0, -sinY);
        rotationY.setValue(2, 2, cosY);
        rotationY.setValue(3, 3, 1);

        rotationZ.setValue(0, 0, cosZ);
        rotationZ.setValue(0, 1, -sinZ);
        rotationZ.setValue(1, 0, sinZ);
        rotationZ.setValue(1, 1, cosZ);
        rotationZ.setValue(2, 2, 1);
        rotationZ.setValue(3, 3, 1);

        const combinedRotation = multiplyMatrices(rotationX, multiplyMatrices(rotationY, rotationZ));

        return multiplyMatrices(m1, combinedRotation);
    } else {
        console.log("Obracanie dostępne tylko dla macierzy 3x3 i 4x4");
        return null;
    }
}

//macierz jednostkowa
const createIdentityMatrix = (size) => {
    const identityMatrix = new SqrMatrix(size);

        for (let i = 0; i < size; i++) {
            identityMatrix.setValue(i, i, 1)
        }
        return identityMatrix;

}

class Vector {
    constructor(x, y, z, w = 1) {
        this.coordinates = [x, y, z, w];
    }

    // Obrót wektora o kąt wokół osi Y
    rotateY(angle) {
        const cosY = Math.cos(angle);
        const sinY = Math.sin(angle);

        const x = this.coordinates[0] * cosY + this.coordinates[2] * sinY;
        const y = this.coordinates[1];
        const z = -this.coordinates[0] * sinY + this.coordinates[2] * cosY;

        return new Vector(x, y, z);
    }

    // Wyświetlanie współrzędnych wektora z określoną precyzją
    print(precision = 1) {
    const roundedCoordinates = this.coordinates.map(coord => coord.toFixed(precision));
    console.log(roundedCoordinates);
    }
}


//testowanie

const m1 = new SqrMatrix(4);

m1.setValue(0, 0, 1);
m1.setValue(0, 1, 2);
m1.setValue(0, 2, 3);
m1.setValue(0, 3, 4);
m1.setValue(1, 0, 5);
m1.setValue(1, 1, 6);
m1.setValue(1, 2, 7);
m1.setValue(1, 3, 8);
m1.setValue(2, 0, 9);
m1.setValue(2, 1, 10);
m1.setValue(2, 2, 11);
m1.setValue(2, 3, 12);
m1.setValue(3, 0, 13);
m1.setValue(3, 1, 14);
m1.setValue(3, 2, 15);
m1.setValue(3, 3, 16);

const m2 = new SqrMatrix(4);

m2.setValue(0, 0, 1);
m2.setValue(0, 1, 2);
m2.setValue(0, 2, 3);
m2.setValue(0, 3, 6);
m2.setValue(1, 0, 5);
m2.setValue(1, 1, 3);
m2.setValue(1, 2, 8);
m2.setValue(1, 3, 5);
m2.setValue(2, 0, 1);
m2.setValue(2, 1, 14);
m2.setValue(2, 2, 0);
m2.setValue(2, 3, 10);
m2.setValue(3, 0, -3);
m2.setValue(3, 1, 4);
m2.setValue(3, 2, 15);
m2.setValue(3, 3, 6);

console.log("Dodawanie");

let m3 = addMatrices(m1, m2);
m3.print();

console.log("Odejmowanie");

m3 = substractMatrices(m1, m2);
m3.print();

console.log("Mnożenie przez skalar");

m3 = multiplayByScalar(m1,3);
m3.print();

console.log("Mnożenie macierzy");

m3 = multiplyMatrices(m1,m2);
m3.print();

console.log("Transponowanie macierzy");
m3 = transposeMatrix(m1);
m3.print();

const m4 = new SqrMatrix(3);

m4.setValue(0, 0, 1);
m4.setValue(0, 1, 2);
m4.setValue(0, 2, 2);
m4.setValue(1, 0, 2);
m4.setValue(1, 1, 0);
m4.setValue(1, 2, 1);
m4.setValue(2, 0, 1);
m4.setValue(2, 1, 2);
m4.setValue(2, 2, 1);

console.log("Wyznacznik")
console.log(m4.determinant())

console.log("Wyznacznik duży")
console.log(m1.determinant())

console.log("Dopełnienie macierzy")
m3 = m4.getAdjointMatrix();
m3.print();

console.log("Macierz odwrotna");
m3 = inverseMatrix(m4);
m3.print();

console.log("Translacja macierzy");
const m6 = new SqrMatrix(4);

m6.setValue(0, 0, 1);
m6.setValue(0, 1, 2);
m6.setValue(0, 2, 3);
m6.setValue(0, 3, 4);
m6.setValue(1, 0, 5);
m6.setValue(1, 1, 6);
m6.setValue(1, 2, 7);
m6.setValue(1, 3, 8);
m6.setValue(2, 0, 9);
m6.setValue(2, 1, 10);
m6.setValue(2, 2, 11);
m6.setValue(2, 3, 12);
m6.setValue(3, 0, 13);
m6.setValue(3, 1, 14);
m6.setValue(3, 2, 15);
m6.setValue(3, 3, 16);

console.log("Macierz przed translacją:");
m6.print();

// Przesunięcie o wektor (2, 3, 1)
const translatedMatrix2 = translateMatrix(m6,2,3,1);

console.log("Macierz po translacji:");
translatedMatrix2.print();

const matrixToScale = new SqrMatrix(3);

matrixToScale.setValue(0, 0, 1);
matrixToScale.setValue(0, 1, 2);
matrixToScale.setValue(0, 2, 3);
matrixToScale.setValue(1, 0, 4);
matrixToScale.setValue(1, 1, 5);
matrixToScale.setValue(1, 2, 6);
matrixToScale.setValue(2, 0, 7);
matrixToScale.setValue(2, 1, 8);
matrixToScale.setValue(2, 2, 9);

console.log("Macierz przed skalowaniem:");
matrixToScale.print();

// Skalowanie o wartości 2 wzdłuż osi x, 3 wzdłuż osi y, i 0.5 wzdłuż osi z
const scaledMatrix = scaleMatrix(matrixToScale, 2, 3, 0.5);

console.log("Macierz po skalowaniu:");
scaledMatrix.print();

console.log("Obracanie macierzy");
const m7 = new SqrMatrix(3);

m7.setValue(0, 0, 1);
m7.setValue(0, 1, 2);
m7.setValue(0, 2, 3);
m7.setValue(1, 0, 4);
m7.setValue(1, 1, 5);
m7.setValue(1, 2, 6);
m7.setValue(2, 0, 7);
m7.setValue(2, 1, 8);
m7.setValue(2, 2, 9);

console.log("Macierz przed obrotem:");
m7.print();

// Obrót wokół osi Z (kąt 45 stopni)
const rotatedMatrixZ = rotateMatrix(m7, 0, 0, Math.PI / 4);

console.log("Macierz po obrocie wokół osi Z:");
rotatedMatrixZ.print();

// Obrót wokół osi X (kąt 90 stopni)
const rotatedMatrixX = rotateMatrix(m7, Math.PI / 2, 0, 0);

console.log("Macierz po obrocie wokół osi X:");
rotatedMatrixX.print();

// Obrót wokół osi Y (kąt 60 stopni)
const rotatedMatrixY = rotateMatrix(m7, 0, Math.PI / 3, 0);

console.log("Macierz po obrocie wokół osi Y:");
rotatedMatrixY.print();

//Macierz jednostkowa 4x4
console.log("Macierz jednostkowa 4x4");
const identity4x4 = createIdentityMatrix(4);
identity4x4.print();

//Macierz jednostkowa
console.log("Macierz jednostkowa 3x3");
const identity3x3 = createIdentityMatrix(3);
identity3x3.print();


//Zadanie
console.log("");
console.log("");
console.log("");
console.log("Zadanie sprawdzające");
console.log("Brak przemienności mnożenia macierzy");
console.log("A i B");
const test = multiplyMatrices(m1,m2)
test.print();

console.log("B i A");
const test2 = multiplyMatrices(m2,m1)
test2.print();

console.log("Wektor [1, 0, 0, 1] i obrót o 90 stopni wokół osi Y");

// Utworzenie wektora [1, 0, 0]
const vectorToRotate = new Vector(1, 0, 0);

console.log("Wektor przed obrotem:");
vectorToRotate.print();

// Obrót wektora o 90 stopni wokół osi Y
const rotatedVector = vectorToRotate.rotateY(Math.PI / 2);

console.log("Wektor po obrocie o 90 stopni wokół osi Y:");
rotatedVector.print();


