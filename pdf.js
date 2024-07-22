function gamma(z) {
    // Lanczos近似による実装
    const g = 7;
    const p = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }

    z -= 1;
    let x = p[0];
    for (let i = 1; i < g + 2; i++) {
        x += p[i] / (z + i);
    }

    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

class StandardNormalDistribution {
    constructor(params) {
        this.name = "標準正規分布";
        this.formula = `$$ N(0, 1) = {1 \\over \\sqrt{2 \\pi}} \\exp{(\\frac{-x^2}{2})} $$`;
        this.MinStartX = -3
        this.MinEndX = 3
        this.x_min = -4
        this.x_max = 4
    }
    pdf(x) {
        return Math.exp(-0.5 * (x) ** 2) / Math.sqrt(2 * Math.PI);
    }

}

class NormalDistribution {
    constructor(params) {
        this.name = "正規分布";
        this.mean = params[0];
        this.std = params[1];
        this.variance = this.std ** 2;
        this.formula = `$$ N(\\mu, \\sigma) = {1 \\over \\sqrt{2 \\pi} \\sigma} \\exp{(\\frac{-( x- \\mu)^2}{2\\sigma^2})} , \\mu = ${this.mean}, \\sigma = ${this.std} $$`
        this.MinStartX = -3
        this.MinEndX = 3
        this.x_min = this.mean - 4 * this.std
        this.x_max = this.mean + 4 * this.std
    }
    pdf(x) {
        return Math.exp(-0.5 * (x - this.mean) ** 2 / this.variance) / Math.sqrt(2 * Math.PI * this.variance);
    }

}

class UniformDistribution {
    constructor(params) {
        this.name = "一様分布";
        this.a = params[0];
        this.b = params[1];
        this.formula = `$$ U(a, b) = {1 \\over b - a }, a=${this.a}, b=${this.b} $$`;
        this.MinStartX = this.a + 0.2
        this.MinEndX = this.b - 0.2
        this.x_min = this.a
        this.x_max = this.b
    }
    pdf(x) {
        if (x < this.a || x > this.b) {
            return 0;
        }
        return 1 / (this.b - this.a);
    }
}

class ExpoDistribution {
    constructor(params) {
        this.name = "指数分布";
        this.lambda = params[0];
        this.formula = `$$ \\exp(\\lambda) = \\begin{cases}  {\\lambda e^{-\\lambda x}} & (x \\ge 0) \\\\ 0 & (x < 0) \\end{cases} , \\lambda=${this.lambda.toFixed(2)} $$`
        this.MinStartX = 0.1
        this.MinEndX = 3
        this.x_min = 0
        this.x_max = 10
    }
    pdf(x) {
        if (x < 0) {
            return 0;
        }
        return this.lambda * Math.exp(-this.lambda * x);
    }
}

class GammaDistribution {
    constructor(params) {
        this.name = "ガンマ分布";
        this.alpha = params[0];
        this.beta = params[1];
        this.formula = `$$ \\Gamma(\\alpha, \\beta) = {\\beta^\\alpha \\over \\Gamma(\\alpha)} x^{\\alpha - 1} e^{-\\beta x} , \\alpha=${this.alpha}, \\beta=${this.beta.toFixed(2)} $$`
        this.MinStartX = 0.1
        this.MinEndX = 3
        this.x_min = 0
        this.x_max = 10
    }
    pdf(x) {
        if (x < 0) {
            return 0;
        }
        return (this.beta ** this.alpha) / gamma(this.alpha) * x ** (this.alpha - 1) * Math.exp(-this.beta * x);
    }

}

class TDistribution {
    constructor(params) {
        this.name = "T分布";
        this.n = params[0];
        this.formula = `$$ t(\\nu) = {\\Gamma((n+1)/2) \\over \\sqrt{n\\pi} \\Gamma(n/2)} (1+x^2/n)^{-(n+1)/2} , \\nu=${this.n} $$`
        this.MinStartX = -3
        this.MinEndX = 3
        this.x_min = -4
        this.x_max = 4
    }
    pdf(x) {
        return gamma((this.n + 1) / 2) / (Math.sqrt(this.n * Math.PI) * gamma(this.n / 2)) * (1 + x ** 2 / this.n) ** (-(this.n + 1) / 2);
    }
}

class ParetoDistribution {
    constructor(params) {
        this.name = "パレート分布";
        this.alpha = params[0];
        this.beta = params[1];
        this.formula = `$$ f(x) = \\begin{cases}  {\\beta \\alpha^\\beta \\over x^{\\beta + 1}} & (x > \\alpha) \\\\ 0 & (x \\leq \\alpha) \\end{cases} , \\alpha=${this.alpha}, \\beta=${this.beta} $$`
        this.MinStartX = this.alpha + 0.2
        this.MinEndX = 3
        this.x_min = 1
        this.x_max = 10
    }
    pdf(x) {
        if (x < this.alpha) {
            return 0;
        }
        return this.beta * (this.alpha ** x) / x ** (this.beta + 1);
    }
}

class LaplaceDistribution {
    constructor(params) {
        this.name = "ラプラス分布";
        this.mu = params[0];
        this.b = params[1];
        this.formula = `$$ f(x) = {1 \\over 2b} \\exp{({-|x-\\mu| \\over b})} , \\mu=${this.mu}, b=${this.b} $$`
        this.MinStartX = - 3
        this.MinEndX = 3
        this.x_min = this.mu - 4 * this.b
        this.x_max = this.mu + 4 * this.b
    }
    pdf(x) {
        return 1 / (2 * this.b) * Math.exp(-Math.abs(x - this.mu) / this.b);
    }
}

class CauchyDistribution {
    constructor(params) {
        this.name = "コーシー分布";
        this.x0 = params[0];
        this.gamma = params[1];
        this.formula = `$$ f(x) = {1 \\over \\pi} {\\gamma \\over (x - x_o)^2 + \\gamma^2} , x_0=${this.x0}, \\gamma=${this.gamma} $$`
        this.MinStartX = - 3
        this.MinEndX = 3
        this.x_min = -10
        this.x_max = 10
    }
    pdf(x) {
        return (1 / Math.PI) * this.gamma / (((x - this.x0) ** 2 + this.gamma ** 2));
    }
}

