/**
 * Singly Linked List data strucuture implementation:
 *
 * list's elements(nodes) are coupled with each other in one direction => each node has the pointer to next one, but not to previous.
 * last element's pointer to next node equals to null
 * nodes can be added/deleted/accessed both from _head/tail and by its position in the list.
 */

/**
 * List Node class
 * stores the data and pointer to next element
 */
 class ListNode {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * SinglyLinkedList class
 * stores pointer to the list head and current list length
 */
 class SinglyLinkedList {
  constructor() {
    this._head = null;
    this.length = 0;
  }

  getHead() {
    return this._head;
  }

  addNodeToHead(nodeData) {
    const newNode = new ListNode(nodeData);
    if (!this._head && !this.length) {
      this._head = newNode;
    } else {
      const prevHead = this._head;
      this._head = newNode;
      this._head.next = prevHead;
    }
    this.length++;
  }

  removeNodeFromHead() {
    if (!this.length) return;
    const isSingleItem = this.length === 1;
    this._head = isSingleItem ? null : this._head.next;
    this.length = isSingleItem ? 0 : this.length - 1;
  }

  getLastNode() {
    if (!this.length && !this._head) return null;

    let currentNode = this._head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  removeLastNode() {
    if (!this.length && !this._head) return null;

    let currentNode = this._head;
    let prevNode = null;
    while (currentNode.next) {
      prevNode = currentNode;
      currentNode = currentNode.next;

      if (!currentNode.next) {
        prevNode.next = null;
        this.length--;
        return currentNode;
      }
    }
  }

  getNodeByPosition(position) {
    if (this.length < position || !this.length) return null;
    if (position === 0) return this._head;
    if (position === this.length - 1) return this.getLastNode();
    return this._loopListByPosition(
      position,
      (currentNode, currentPosition) => {
        const isCountMatch = currentPosition === position;
        return {
          done: isCountMatch,
          node: currentNode,
        };
      }
    );
  }

  addNodeToPosition(nodeData, position) {
    if (position > this.length) return null;
    if (position === 0) {
      this.addNodeToHead(nodeData);
      return this._head;
    }

    return this._loopListByPosition(
      position,
      (currentNode, currentPosition) => {
        if (currentPosition + 1 === position) {
          const newNode = new ListNode(nodeData);
          newNode.next = currentNode.next;
          currentNode.next = newNode;
          this.length++;
          return { done: true, node: newNode };
        }
        return { done: false, node: currentNode };
      }
    );
  }

  removeNodeByPosition(position) {
    if (position > this.length || !this.length) return null;
    if (position === 0) {
      const removedNode = this._head;
      this.removeNodeFromHead();
      return removedNode;
    }

    return this._loopListByPosition(
      position,
      (currentNode, currentPosition) => {
        if (currentPosition + 1 === position) {
          const _removedNode = currentNode.next;
          currentNode.next = currentNode.next ? currentNode.next.next : null;
          this.length--;
          return { done: true, node: _removedNode };
        }
        return { done: false, node: currentNode };
      }
    );
  }

  clearList() {
    this._head = null
    this.length = 0
  }

  // private methods
  _loopListByPosition(position, actionCallback) {
    let currentNode = this._head;
    let currentPosition = 0;
    while (currentPosition <= position) {
      const { done, node } = actionCallback(currentNode, currentPosition);
      if (done) return node;
      currentNode = node.next;
      currentPosition++;
    }
  }
}


module.exports = SinglyLinkedList