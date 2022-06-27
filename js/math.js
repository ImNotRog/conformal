// time to smoke crystal math

/*
This is an implementation of the extended complex plane (i.e. the Riemann sphere), which includes all your complex numbers
but also the point at infinity. There is no distinction between positive or negative infinity; if you go far enough in any direction,
you converge to *the* point at Infinity.

On the metric space on the Riemann Sphere (dont worry about it), we can define division by 0, because for technical reasons 
lim (z->0) 1/z = infinity. Thus we have a/0 = Infinity, and a/Infinity = 0. However, 0 * Infinity remains undefined, and in practice,
we'll have to use funny limits.
*/

// traditional classes in Javascript! how scandalous !!!
class Complex {
    constructor(r,i) {

        this.r = r;
        if(typeof i === 'number') {
            this.i = i;
        } else {
            this.i = 0;
        }

    }

    isInfinity() {
        return this.r === Infinity;
    }
    isZero() {
        return this.r === 0 && this.i === 0;
    }

    toString() {
        if(this.isInfinity()) return '∞';
        if(this.i === 0) return `${this.r}`;
        if(this.r === 0) return `${this.i}i`;
        return `${this.r} + ${this.i}i`;
    }

    static add(a,b) {
        if(a.isInfinity() || b.isInfinity()) return new Complex(Infinity);
        return new Complex(a.r + b.r, a.i + b.i);
    }

    static neg(a) {
        if(a.isInfinity()) return new Complex(Infinity);
        return new Complex(-a.r, -a.i);
    }

    static sub(a,b) {
        return Complex.add(a,Complex.neg(b));
    }

    static mult(a,b) {
        if ((a.isZero() && b.isInfinity()) || (a.isInfinity() && b.isZero())) throw "Attempt to multiply 0 by ∞!"
        if (a.isInfinity() || b.isInfinity()) return new Complex(Infinity);
        return new Complex(a.r * b.r - a.i * b.i, a.r * b.i + a.i * b.r);
    }

    static conj(a) {
        if (a.isInfinity()) return new Complex(Infinity);
        return new Complex(a.r, -a.i);
    }

    static mag(a) {
        if (a.isInfinity()) return new Complex(Infinity);
        return new Complex(Math.sqrt(a.r ** 2 + a.i ** 2));
    }

    static inv(a) {
        if(a.isInfinity()) return new Complex(0);
        if(a.isZero()) return new Complex(Infinity);

        const conj = Complex.conj(a);
        const mag = a.r ** 2 + a.i ** 2; // technically mag^2
        return new Complex(conj.r / mag, conj.i / mag);
    }

    static exp(a) {
        return new Complex(Math.exp(a.r) * Math.cos(a.i), Math.exp(a.r) * Math.sin(a.i));
    }

    static sin(a) {
        return Complex.div( Complex.sub( Complex.exp(a), Complex.exp(Complex.neg(a)) ), new Complex(0,2) )
    }

    static cos(a) {
        return Complex.div(Complex.add(Complex.exp(a), Complex.exp(Complex.neg(a))), new Complex(2))
    }

    static div(a,b) {
        return Complex.mult(a, Complex.inv(b));
    }
}

const Mapping = (z) => {
    // Mobius Transform
    const a = new Complex(0);
    const b = new Complex(10);
    const c = new Complex(1);
    const d = new Complex(0);

    // return Complex.add(z, new Complex(1,1));

    // if( z.isInfinity() ) return Complex.div(a,c);
    // return Complex.inv(Complex.cos(Complex.mult(new Complex(2),z)));

    return Complex.div(Complex.add(Complex.mult(a, z), b), Complex.add(Complex.mult(c, z), d) ); // (az+b)/(cz+d)
}
