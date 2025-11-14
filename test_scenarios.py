# Test file for qualified path copying

# Scenario 1: Top-level function (should NOT include any class name)
def top_level_function():
    """This should be: module.top_level_function"""
    pass

# Scenario 2: Class with methods
class MyClass:
    def method_in_class(self):
        """This should be: module.MyClass.method_in_class"""
        pass
    
    def another_method(self):
        """This should be: module.MyClass.another_method"""
        pass

# Scenario 3: Top-level function after a class (should NOT include MyClass)
def function_after_class():
    """This should be: module.function_after_class"""
    pass

# Scenario 4: Another class
class AnotherClass:
    def some_method(self):
        """This should be: module.AnotherClass.some_method"""
        pass

# Scenario 5: Top-level function after multiple classes (should NOT include AnotherClass)
def final_top_level_function():
    """This should be: module.final_top_level_function"""
    pass

# Scenario 6: Nested function inside a top-level function
def outer_function():
    """This should be: module.outer_function"""
    def inner_function():
        """Inner functions are not typically copied, but if they are,
        this should be: module.outer_function.inner_function (not with a class name)"""
        pass
    return inner_function
