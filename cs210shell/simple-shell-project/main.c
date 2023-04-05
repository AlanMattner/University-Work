/* 	CS210 Simple Shell Practical
 
	This will be built into the main executable for the system.

	The header above is to be moved to a different file later.

*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>
#include <sys/wait.h>
#include "declarations.h"

// Definitions

#define MAX_INPUT 512
#define MAX_HISTORY 20

// Global Variables

int main(void) {
	
	pid_t pid;		
	char input[MAX_INPUT];			// the full line of input the user types
	char *args[128];			// where the args are stored following tokenize_input(input)
	char **argv = &args[0];		// we don't know how many tokens we'll receive...
	int running = 1;
	int *status = &running;
	char *path = getenv("PATH");// save PATH at the start
	char* buffer;				// buffer for cwd

	printf("This is the simple shell\n\n");
	
	// can maybe be placed into a function
	printf("PATH : %s\n", getenv("PATH")); // printing path at the start
	chdir(getenv("HOME"));				   // change directory to HOME at the start
	buffer = getcwd(NULL,100);			   // buffer for current working directory
	printf("current working directory %s\n", buffer);
	
	while(*status) {
		int externalCallsStatus = 0;			// resets whether external call has been made at start. might be a bad way to do this but it works for now
		printf("shell> "); 
		get_input_line(input, status);		
		if (input[0] != 0) {
			tokenize_input(input, argv);
			externalCallsStatus = builtInCheck(argv);
			pid = fork();

			if (pid > 0) {
				wait(NULL);

			} else if (pid == 0 && externalCallsStatus == 0) {
				execute(argv);
				exit(0);

			} else if (pid < 0) {
				printf("fork failed\n");

			} else {
				printf("really bad\n");

			}
		}
	}
	quit(path);
}
