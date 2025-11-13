# Edge cases for testing

# Edge Case 1: Class and function both at same indentation level
class TopLevelClass:
    pass

def function_same_level():
    """Should be: module.function_same_level (NO class name)"""
    pass

# Edge Case 2: Nested class (less common in Python, but valid)
class OuterClass:
    class InnerClass:
        def method_in_inner(self):
            """Should be: module.OuterClass.method_in_inner 
            (Note: nested classes are complex, current impl may not handle perfectly)"""
            pass
    
    def method_in_outer(self):
        """Should be: module.OuterClass.method_in_outer"""
        pass

# Edge Case 3: Function with leading whitespace (unusual but valid)
    def weirdly_indented_function():
        """Should be: module.weirdly_indented_function (NO class name)
        Though this is unusual Python style"""
        pass

# Edge Case 4: Multiple classes at different indentation levels
class NormalClass:
    def normal_method(self):
        """Should be: module.NormalClass.normal_method"""
        pass

    # Inner helper function (uncommon but technically valid)
    def another_method(self):
        """Should be: module.NormalClass.another_method"""
        pass
