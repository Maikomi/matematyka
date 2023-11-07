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

//Prawie dobrze, ale nadal źle. Minusy są nie tak
const inverseMatrix = (m1) => {
    let n = m1.getSize();
    if (n < 2) {
        throw new Error("Matrix is too small to have an inverse");
    }

    const m2 = m1.getAdjointMatrix();
    const det = m1.determinant();

    if (det === 0) {
        throw new Error("Matrix is singular, it does not have an inverse");
    }

    const result = new SqrMatrix(n);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result.setValue(i, j, m2.getValue(i, j) / det); // Poprawione przypisanie
        }
    }

    return result;
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

// console.log("Macierz odwrotna");
// m3 = inverseMatrix(m1);
// m3.print();

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

console.log("wyznacznik")
console.log(m4.determinant())
console.log("wyznacznik duży")
console.log(m2.determinant())

console.log("dopełnienie macierzy")
m3 = m4.getAdjointMatrix();
m3.print();

console.log("macierz odwrotna duża");
m3 = inverseMatrix(m2);
m3.print();

console.log("macierz odwrotna mała");
m3 = inverseMatrix(m4);
m3.print();

