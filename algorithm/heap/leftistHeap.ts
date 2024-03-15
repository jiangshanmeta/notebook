class LeftistNode {
    public left: LeftistNode | null = null;
    public right: LeftistNode | null = null;
    public dist = 0;
    constructor(public element: number) {

    }
}

export class LeftistHeap {
    private root: LeftistNode | null;
    constructor(initialVals: number[] = []) {
        if (initialVals.length > 0) {
            const queue = initialVals.map(item => new LeftistNode(item));
            while (queue.length > 1) {
                const first = queue.shift()!;
                const second = queue.shift()!;

                queue.push(this.mergeNode(first, second)!)
            }

            this.root = queue[0];
        } else {
            this.root = null;
        }


    }

    public isEmpty() {
        return this.root === null;
    }

    private mergeNode(x: LeftistNode | null, y: LeftistNode | null): LeftistNode | null {
        if (x === null) {
            return y;
        }
        if (y === null) {
            return x;
        }
        if (x.element > y.element) {
            const tmp = x;
            x = y;
            y = tmp;
        }

        if (x.left === null) {
            x.left = y;
        } else {
            x.right = this.mergeNode(x.right, y);
            if (x.left.dist < x.right!.dist) {
                const tmp = x.left;
                x.left = x.right;
                x.right = tmp;
            }
            x.dist = x.right!.dist + 1;
        }

        return x;
    }

    public merge(leftistHeap: LeftistHeap) {
        if (leftistHeap === this) {
            return
        }
        this.root = this.mergeNode(this.root, leftistHeap.root);
    }

    public insert(element: number) {
        this.root = this.mergeNode(this.root, new LeftistNode(element));
    }

    public getMin(): number {
        if (!this.root) {
            return 0;
        }
        return this.root.element;
    }

    public deleteMin(): number {
        if (!this.root) {
            return 0;
        }
        const val = this.root.element;
        this.root = this.mergeNode(this.root.left, this.root.right);

        return val;
    }

}