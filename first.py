


str1 = "PyTHon"
print('Original String:', str1)
lower = []
upper = []
for char in str1:
    if char.islower():

        lower.append(char)
    else:
    
        upper.append(char)

sorted_str = ''.join(lower + upper)
print('Result:', sorted_str)