#include <emscripten.h>
#include <iostream>
#include <pthread.h>
#include <vector>
#include <mutex>

std::mutex vectLock;
std::vector<unsigned int> primeVect;

struct arg_struct {
    unsigned int start;
    unsigned int end;
};

EMSCRIPTEN_KEEPALIVE
void *getPrimes(void *arguments) {
    struct arg_struct *args = (struct arg_struct *)arguments;
    unsigned int start = args -> start;
    unsigned int end = args -> end;
    for (unsigned int x = start; x <= end; x++) {
        for (unsigned int y = 2; y < x; y++) {
            if ((x % y) == 0) {
                break;
            } else if ((y + 1) == x) {
                vectLock.lock();
                primeVect.push_back(x);
                vectLock.unlock();
            }
        }
    }
}

EMSCRIPTEN_KEEPALIVE
std::vector<unsigned int> getPrimesWithThreads(unsigned int start, unsigned int end, unsigned int numThreads) {
    std::vector<pthread_t> threadVect;
    unsigned int threadSpread = end / numThreads;
    unsigned int newEnd = start + threadSpread - 1;

    struct arg_struct args;
    args.start = start;
    args.end = newEnd;

    for (unsigned int x = 0; x < numThreads; x++) {
        if (pthread_create(&threadVect[x], NULL, getPrimes, (void *)&args))
        {
            std::cout << "Thread create failed." << std::endl;
            return primeVect;
        }
        start += threadSpread;
        newEnd += threadSpread;

        args.start = start;
        args.end = newEnd;
    }

    for (unsigned int x = 0; x < numThreads; x++) {
        if (pthread_join(threadVect[x], NULL)) {
            std::cout << "Thread join failed" << std::endl;
            return primeVect;
        }
    }

    return primeVect;
}