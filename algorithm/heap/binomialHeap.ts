function getRandom(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1))
}

class BinomialTree {
    children: Array<BinomialTree> = [];
    order = 0;

    constructor(public element: number) {

    }

}

class BinomialHeap {
    trees: Array<BinomialTree | null> = [];
    size = 0;

    constructor(initialVals: number[] = []) {
        for (let i = 0; i < initialVals.length; i++) {
            this.insert(initialVals[i]);
        }

    }

    private mergeNode(tree1: BinomialTree, tree2: BinomialTree) {
        if (tree1.element > tree2.element) {
            const tmp = tree1;
            tree1 = tree2;
            tree2 = tmp;
        }
        tree1.children.push(tree2);
        tree1.order++;

        return tree1;
    }

    private mergeTrees(trees1: Array<BinomialTree | null>, trees2: Array<BinomialTree | null>) {
        let carry: BinomialTree | null = null;
        const L = Math.max(trees1.length, trees2.length);
        for (let i = 0; i < L; i++) {

            switch (4 * (+(!!carry)) + 2 * (+(!!trees1[i])) + (+ (!!trees2[i]))) {
                case 0:
                    break;
                case 1:
                    trees1[i] = trees2[i];
                    break;
                case 2:
                    break;
                case 3:
                    carry = this.mergeNode(trees1[i]!, trees2[i]!);
                    trees1[i] = null;
                    break;
                case 4:
                    trees1[i] = carry;
                    carry = null;
                    break;
                case 5:
                    carry = this.mergeNode(carry!, trees2[i]!);
                    break;
                case 6:
                    carry = this.mergeNode(carry!, trees1[i]!);
                    trees1[i] = null;
                    break;
                case 7:
                    carry = this.mergeNode(carry!, trees2[i]!);
                    break;
            }


        }
        if (carry) {
            trees1[L] = carry;
        }

    }

    public merge(binomialHeap: BinomialHeap) {
        if (binomialHeap === this) {
            return;
        }

        this.mergeTrees(this.trees, binomialHeap.trees);
        this.size += binomialHeap.size;
    }

    public isEmpty() {
        return this.size === 0;
    }

    public getMin() {
        if (this.size === 0) {
            return 0;
        }
        let result = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < this.trees.length; i++) {
            if (!this.trees[i]) {
                continue;
            }
            result = Math.min(result, this.trees[i]!.element);
        }
        return result;
    }

    public insert(element: number) {
        this.mergeTrees(this.trees, [new BinomialTree(element)])
        this.size++;
    }

    public deleteMin() {
        if (this.size === 0) {
            return 0;
        }
        let index = -1;
        let minVal = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < this.trees.length; i++) {
            if (!this.trees[i]) {
                continue;
            }
            if (this.trees[i]!.element < minVal) {
                minVal = this.trees[i]!.element;
                index = i;
            }

        }

        const root = this.trees[index]!;
        this.trees[index] = null;

        if ((this.size & (this.size - 1)) === 0) {
            this.trees.pop();
        }

        this.mergeTrees(this.trees, root.children)
        this.size--;

        return minVal;
    }


}