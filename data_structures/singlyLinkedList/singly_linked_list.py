'''
Singly Linked List data strucuture implementation:

list's elements(nodes) are coupled with each other in one direction => each node has the pointer to next one, but not to previous.
last element's pointer to next node equals to null
nodes can be added/deleted/accessed both from _head/tail and by its position in the list.
'''

from operator import itemgetter


class ListNode:
    '''
    List Node class
    stores the data and pointer to next element
    '''

    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next


class SinglyLinkedList:
    '''
    SinglyLinkedList class
    stores pointer to the list head and current list length
    '''

    def __init__(self):
        self.__head = None
        self.list_length = 0

    @property
    def head(self):
        return self.__head

    def add_node_to_head(self, node_data):
        new_node = ListNode(node_data)
        if not self.__head and not self.list_length:
            self.__head = new_node
        else:
            prev_head = self.__head
            self.__head = new_node
            self.__head.next = prev_head
        self.list_length += 1

    def remove_node_from_head(self):
        if not self.list_length:
            return
        is_single_item = self.list_length == 1
        self.__head = None if is_single_item else self.__head.next
        self.list_length = 0 if is_single_item else self.list_length - 1

    def get_last_node(self):
        if not self.list_length and not self.__head:
            return None
        current_node = self.__head
        while current_node.next:
            current_node = current_node.next
        return current_node

    def remove_last_node(self):
        if not self.list_length and not self.__head:
            return None
        current_node = self.__head
        prev_node = None
        while current_node.next:
            prev_node = current_node
            current_node = current_node.next
            if not current_node.next:
                prev_node.next = None
                self.list_length -= 1
                return current_node

    def get_node_by_position(self, position):
        if self.list_length < position or not self.list_length:
            return None
        if position == 0:
            return self.__head
        if position == self.list_length - 1:
            return self.get_last_node()

        def _action_callback(current_node, current_position):
            is_count_match = current_position == position
            return {"done": is_count_match, "node": current_node}
        return self.__loop_list_by_position(position, _action_callback)

    def add_node_to_position(self, node_data, position):
        if position > self.list_length:
            return None
        if position == 0:
            self.add_node_to_head(node_data)
            return self.__head

        def _action_callback(current_node, current_position):
            if current_position + 1 == position:
                new_node = ListNode(node_data)
                new_node.next = current_node.next
                current_node.next = new_node
                self.list_length += 1
                return {"done": True, "node": new_node}
            return {"done": False, "node": current_node}
        return self.__loop_list_by_position(position, _action_callback)

    def remove_node_by_position(self, position):
        if position > self.list_length or not self.list_length:
            return None
        if position == 0:
            removed_node = self.__head
            self.remove_node_from_head()
            return removed_node

        def _action_callback(current_node, current_position):
            if current_position + 1 == position:
                _removed_node = current_node.next
                current_node.next = current_node.next.next if current_node.next else None
                self.list_length -= 1
                return {"done": True, "node": _removed_node}
            return {"done": False, "node": current_node}
        return self.__loop_list_by_position(position, _action_callback)

    def clear_list(self):
        self.__node = None
        self.list_length = 0

    def __loop_list_by_position(self, position, action_callback):
        current_node = self.__head
        current_position = 0

        while current_position <= position:
            done, node = itemgetter("done", "node")(
                action_callback(current_node, current_position))
            if done:
                return node
            current_node = node.next
            current_position += 1
