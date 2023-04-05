import numpy as np
import matplotlib.pyplot as plt
from PerceptronLogic import Perceptron

# Define the OR gate training data and labels
logic_input = []
logic_input.append(np.array([1, 0, 0]))
logic_input.append(np.array([1, 0, 1]))
logic_input.append(np.array([1, 1, 0]))
logic_input.append(np.array([1, 1, 1]))

logic_label = np.array([0, 1, 1, 0])

# Create a perceptron instance
p = Perceptron(3)

p.print_details()

p.test(logic_input, logic_label)

# Train the perceptron on the OR gate data
p.train(logic_input, logic_label)

# Test the perceptron's predictions on the OR gate data
p.test(logic_input, logic_label)

