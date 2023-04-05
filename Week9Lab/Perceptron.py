import matplotlib.pyplot as plt
import numpy as np


class Perceptron(object):

    #==========================================#
    # The init method is called when an object #
    # is created. It can be used to initialize #
    # the attributes of the class.             #
    #==========================================#
    def __init__(self, no_inputs, target, max_iterations=20, learning_rate=0.1):
        self.no_inputs = no_inputs
        self.weights = np.ones(no_inputs) / no_inputs
        self.target = target
        self.max_iterations = max_iterations
        self.learning_rate = learning_rate

    #=======================================#
    # Prints the details of the perceptron. #
    #=======================================#

    def print_details(self):
        print("No. inputs:\t" + str(self.no_inputs))
        print("Max iterations:\t" + str(self.max_iterations))
        print("Learning rate:\t" + str(self.learning_rate))

    #=========================================#
    # Performs feed-forward prediction on one #
    # set of inputs.                          #
    #=========================================#

    def predict(self, inputs):
        # taken from slides on myplace as to how to calculate the activation function
        activation = np.dot(inputs, self.weights)
        if activation > 0:
            return 1
        else:
            return 0

    #======================================#
    # Trains the perceptron using labelled #
    # training data.                       #
    #======================================#

    def train(self, training_data, labels):
        # check length of training data and labels are the same
        assert len(training_data) == len(labels)
        for i in range(self.max_iterations):
            for j in range(len(training_data)):
                # get predicted output of the perceptron for jth data input, using predict function
                prediction = self.predict(training_data[j])
                # calculate error between predicted output and actual output
                if labels[j] == self.target:
                    error = 1 - prediction
                else:
                    error = 0 - prediction
                self.weights += self.learning_rate * error * training_data[j]

                # print(self.weights)

    #=========================================#
    # Tests the prediction on each element of #
    # the testing data.
    #=========================================#

    def test(self, testing_data, labels):
        assert len(testing_data) == len(labels)
        accuracy = 0.0
        num_correct = 0
        for i in range(len(testing_data)):
            prediction = self.predict(testing_data[i])
            correct = 1 if labels[i] == self.target else 0
            if prediction == correct:
                num_correct += 1
        accuracy = (num_correct / len(testing_data)) * 100
        # for i in range(len(testing_data)):
        #     print("Actual:" + str(labels[i]) + " Est: " + str(self.predict(testing_data[i])))
        print("Accuracy ",accuracy,"%")
        print("")




