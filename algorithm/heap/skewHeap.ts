class SkewNode {
    public left: SkewNode | null = null;
    public right: SkewNode | null = null;
    constructor(public element: number) {

    }

}


export class SkewHeap {
    public root: SkewNode | null = null;
    constructor(initialVals: number[] = []) {
        if (initialVals.length > 0) {
            const queue = initialVals.map(element => new SkewNode(element));
            while (queue.length > 1) {
                const first = queue.shift()!;
                const second = queue.shift()!;

                queue.push(this.mergeNode(first, second)!)
            }
            this.root = queue[0];
        }

    }

    public isEmpty() {
        return this.root === null;
    }

    private mergeNode(x: SkewNode | null, y: SkewNode | null): SkewNode | null {
        if (!x) {
            return y;
        }
        if (!y) {
            return x;
        }
        if (x.element > y.element) {
            const tmp = x;
            x = y;
            y = tmp;
        }

        x.right = this.mergeNode(x.right, y);

        const tmp = x.left;
        x.left = x.right;
        x.right = tmp;
        return x;
    }

    public merge(skewHeap: SkewHeap) {
        if (skewHeap === this) {
            return;
        }
        this.root = this.mergeNode(this.root, skewHeap.root);
    }

    public insert(element: number) {
        this.root = this.mergeNode(this.root, new SkewNode(element))
    }

    public getMin(): number {
        if (!this.root) {
            return 0
        }
        return this.root.element;
    }

    public deleteMin(): number {
        if (!this.root) {
            return 0;
        }
        const result = this.root.element;
        this.root = this.mergeNode(this.root.left, this.root.right)

        return result;
    }

}