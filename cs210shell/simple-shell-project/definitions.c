/* 	This will be the file for function definitions

	Declarations of these functions are to be 
	held in the declarations.h file

*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <sys/wait.h>

#define MAX_INPUT 512

void get_input_line(char *input, int *status) {

	// will need error catching here e.g if input > 511, only enter pressed etc
	// in future we need to change this formatting to not cause the program to directly exit


	if (fgets(input, MAX_INPUT, stdin) == NULL) {
		memset(input, 0, MAX_INPUT);
		*status = 0;
	}
	input[strcspn(input, "\n")] = 0; // this removes the newline from input
}

void tokenize_input(char *input, char **tokens) {
	/* 	Here we break the input acquired at get_input_line() into delimited tokens
	
	    Each call to strtok() returns a pointer to a null-terminated
        string containing the next token.  This string does not include
        the delimiting byte.  If no more tokens are found, strtok()
        returns NULL.
	*/
	const char delim[8] = {' ','\t','|','>','<','&',';','\n'};
	char *curr = strtok(input,delim);
	int i = 0;

	while (curr != NULL) {
		tokens[i++] = curr;
		curr = strtok(NULL,delim);
	}
	tokens[i++] = NULL;
}

void print_tokens(char **tokens) {
	// purely a tester method
	printf("printing tokens:");
	if ( *tokens != NULL) {
		for ( char **arg = tokens; *arg != NULL; arg++) {
			printf("\"%s\"",*arg);
		}
		printf("\n");
	}
}
/*
char* storeHistory(char* input, ) {

}
*/
void quit(char* path) {
	/* Quit and cleanup. Resets path then exits the current shell. */
	setenv("PATH",path,1);
	printf("PATH: %s\n", getenv("PATH"));
	printf("Exiting...\n");
	exit(0);
}

int getPath(char** argv) {

	if (argv[1] == NULL) { 
		printf("PATH: %s\n", getenv("PATH")); 
		return 1;
	} else { 
		printf("Error: Built-in command getpath takes no arguments\n"); 
		return -1;
	} 
}

int setPath(char** argv) {

	if (argv[1] != NULL && argv[2] == NULL) {
		if (setenv("PATH", argv[1], 1) == 0) {
			printf("New PATH: %s\n", getenv("PATH"));
			return 1;
		} else {
			printf("Error: Built-in command setpath recognised, but unable to set path");
			return -1;
		}
	} else {
		printf("Error: Built-in command setpath takes one argument\n");
		return -1;
	}
}

int cd(char** argv) {

	if (argv[2] == NULL) {
		if (!chdir(argv[1])) {
			return 1;
		} else {
			perror(argv[1]);
			printf("CWD: %s\n", getcwd(NULL,100));		// old test code
			return -1;
		}
	} else {
		printf("Error: Built-in command cd takes on argument");
		return -1;
	}
}

int builtInCheck(char** argv) {

	char* path = getenv("PATH");
	char* builtins[4] = {"exit", "getpath", "setpath", "cd"};
	int len = sizeof(builtins) / sizeof(builtins[0]);

	for (int i = 0; i < len; i++) {
		if (!strcmp(builtins[i], *argv)) { switch (i) {

				case 0: quit(path); 			break; 	// "exit"
				case 1: return getPath(argv); 	break;	// "getpath"
				case 2: return setPath(argv); 	break;	// "setpath" 
				case 3: return cd(argv);	  	break;	// "cd"
		} }
	}
	return 0;
}

void execute (char **argv) {

	if (execvp(*argv, argv) < 0) {		// if not check whether tokens are valid for exec
		print_tokens(argv);
		perror("error with tokens ");

	} else {
		execvp(*argv, argv);	// exec commands

	}
}
	