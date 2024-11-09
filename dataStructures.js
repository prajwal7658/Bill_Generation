class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

class PriorityQueue extends Queue {
    enqueue(item, priority = false) {
        if (priority) {
            this.items.unshift(item);
        } else {
            super.enqueue(item);
        }
    }
}

class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
}

module.exports = { Queue, PriorityQueue, Stack };
