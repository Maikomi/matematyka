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

    determinant() {
        const n = this.getSize()
        if(n===1){
            return this.getValue(0,0)
        }

        if(n===2){
            return (this.getValue(0,0)*this.getValue(1,1)-this.getValue(0,1)*this.getValue(1,0))
        }
        if(n===3){
            let a = this.getValue(0,0)*this.getValue(1,1)*this.getValue(2,2);
            let b = this.getValue(0,1)*this.getValue(1,2)*this.getValue(2,0);
            let c = this.getValue(0,2)*this.getValue(1,0)*this.getValue(2,1);
            let d = this.getValue(0,2)*this.getValue(1,1)*this.getValue(2,0);
            let e = this.getValue(0,0)*this.getValue(1,2)*this.getValue(2,1);
            let f = this.getValue(0,1)*this.getValue(1,0)*this.getValue(2,2);

            return a+b+c-d-e-f;
        }
        if(n>=4){
            let minOne;
            let det = 0;
            for (let j = 0; j < n; j++) {
                if(this.getValue(0, j)!=0){
                    let matrix = new SqrMatrix(n-1);
                    for(let k = 0; k < n-1; k++){
                        for(let l = 0; l < n-1; l++){
                            for(let i = 1; i < n; i++){
                                if(i != j){
                                    matrix.setValue(k, l, this.getValue(i, j));
                                    matrix.print();
                                    let x = (k + l) % 2;
                                    if(x==1){
                                        minOne = 1;
                                    }else{
                                        minOne = -1;
                                    }
                                    //console.log("det: ", det)
                                    det = det + minOne*this.getValue(0,j)*matrix.determinant();
                                    return det;
                                }
                            }
                        }
                    }
                }
            }
        }
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

// const inverseMatrix = (m1) => {
//     let n = m1.getSize();
//     if (n < 2) {
//         throw new Error("Matrix is too small to have an inverse");
//     }

//    let detM
//    for (let i = 0; i < n; i++){
//     for( let j = 0; j < n; j++){

//     }
//    }
// }

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
m4.setValue(0, 2, 3);
m4.setValue(1, 0, 3);
m4.setValue(1, 1, 7);
m4.setValue(1, 2, 2);
m4.setValue(2, 0, 3);
m4.setValue(2, 1, -2);
m4.setValue(2, 2, 1);

console.log("wyznacznik")
console.log(m4.determinant())
console.log("wyznacznik duży")
console.log(m2.determinant())