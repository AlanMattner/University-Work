import numpy as np
import matplotlib.pyplot as plt
import Perceptron as P

# Define the OR gate training data and labels
# logic_input = []
# logic_input.append(np.array([1, 0, 0]))
# logic_input.append(np.array([1, 0, 1]))
# logic_input.append(np.array([1, 1, 0]))
# logic_input.append(np.array([1, 1, 1]))

# logic_label = np.array([0, 0, 0, 1])

# # Create a perceptron instance
# p = P.Perceptron(3)

# p.print_details()

# p.test(logic_input, logic_label)

# # Train the perceptron on the OR gate data
# p.train(logic_input, logic_label)

# # Test the perceptron's predictions on the OR gate data
# p.test(logic_input, logic_label)


trainSet = 'mnist_datasets/mnist_train.csv'
testSet = 'mnist_datasets/mnist_test.csv'

train = np.loadtxt(trainSet, delimiter=',')
test = np.loadtxt(testSet, delimiter=',')

p = P.Perceptron(target=6,no_inputs=28*28)
target_digit = 6
p.print_details()
print("Target digit: " + str(target_digit))

train_data = train[:, 1:]
train_labels = train[:, 0]

test_data = test[:, 1:]
test_labels = test[:, 0]

p.train(train_data, train_labels)

p.test(test_data, test_labels)