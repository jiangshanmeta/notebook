class FibonacciTree {
    left: FibonacciTree | null = null;
    right: FibonacciTree | null = null;
    child: FibonacciTree | null = null;
    degree = 0;

    constructor(public element: number) {

    }

}

export class FibonacciHeap {
    private size = 0;
    private min: FibonacciTree | null = null;

    constructor(initialVals: number[] = []) {
        for (const item of initialVals) {
            this.insert(item);
        }

    }

    public isEmpty() {
        return this.min === null;
    }

    public getMin(): number {
        if (!this.min) {
            return 0;
        }

        return this.min.element;
    }

    public insert(element: number) {
        const node = new FibonacciTree(element);
        node.left = node;
        node.right = node;
        if (this.min === null) {
            this.min = node;
        } else {
            this.mergeNodes(this.min, node);
            if (node.element < this.min.element) {
                this.min = node;
            }
        }
        this.size++;
    }

    private mergeNodes(root1: FibonacciTree, root2: FibonacciTree) {
        const right = root1.right!;
        const left = root2.left!;
        root1.right = root2;
        root2.left = root1;
        left.right = right;
        right.left = left;
    }

    public merge(fibonacciHeap: FibonacciHeap) {
        if (fibonacciHeap === this) {
            return;
        }
        if (fibonacciHeap.isEmpty()) {
            return;
        }
        if (this.min === null) {
            this.min = fibonacciHeap.min;
            this.size = fibonacciHeap.size;
            return;
        }
        this.mergeNodes(this.min, fibonacciHeap.min!);

        if (this.min.element > fibonacciHeap.min!.element) {
            this.min = fibonacciHeap.min;
        }

        this.size += fibonacciHeap.size;
    }

    private mergeNode(x: FibonacciTree, y: FibonacciTree) {
        if (x.element > y.element) {
            const tmp = x
            x = y;
            y = tmp;
        }
        x.degree++;

        if (!x.child) {
            x.child = y;
            return x;
        }

        this.mergeNodes(x.child, y);

        return x;
    }


    public deleteMin(): number {
        if (!this.min) {
            return 0;
        }
        const min = this.min;
        if (min.child) {
            this.mergeNodes(min, min.child);
            min.child = null;
        }
        this.size--;
        if (this.size === 0) {
            this.min = null;
            return min.element;
        }
        const left = min.left!;
        const right = min.right!;
        left.right = right;
        right.left = left;

        if (left === right) {
            this.min = left;
            return min.element;
        }

        const helper = new Array<FibonacciTree | null>(Math.ceil(Math.log2(this.size + 1)));
        const nodes = [right];
        let node = right.right!;
        while (node !== right) {
            nodes.push(node);
            node = node.right!;
        }

        nodes.forEach((node) => {
            node.left = node;
            node.right = node;

            let degree = node.degree;
            while (helper[degree]) {
                node = this.mergeNode(node, helper[degree]!);
                helper[degree] = null;
                degree++;
            }
            helper[degree] = node
        })

        this.min = null;
        for (let i = 0; i < helper.length; i++) {
            if (!helper[i]) {
                continue;
            }
            const node = helper[i]!;
            node.left = node;
            node.right = node;
            if (!this.min) {
                this.min = node;

            } else {
                this.mergeNodes(this.min, node);
                if (node.element < this.min.element) {
                    this.min = node;
                }
            }
        }

        return min.element;
    }

}