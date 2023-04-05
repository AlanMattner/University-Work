#ifndef DECLARATIONS_H
#define DECLARATIONS_H

/* 	This file will include declarations for functions for the Simple Shell

	It may make sense to compartmentalise declarations for the purpose of 
	working on features in branches

*/ 

// Input/file reading functions
void get_input_line(char* input, int* status);
void tokenize_input(char* input, char** tokens);
void print_tokens(char** tokens);
int execute (char** argv);
void quit(char* path);
int setPath(char** argv);
int getPath(char** argv);
int cd(char** argv);
int builtInCheck(char** argv);

// Next function group...

#endif