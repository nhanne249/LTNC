#include <iostream>
#include <iomanip>
#include <string>
#include <limits>
#include <vector>
#include <algorithm>
#include <thread>
#include <cstdlib>

using namespace std;

int MAX_STUDENTS = 100;

class StudentManagement
{
private:
    string *names;
    float *scores;
    int numStudents;

public:
    StudentManagement() : numStudents(0)
    {
        names = new string[MAX_STUDENTS];
        scores = new float[MAX_STUDENTS];
    }

    ~StudentManagement()
    {
        delete[] names;
        delete[] scores;
    }

    void setData(const string &name, float &score)
    {
        this->names[numStudents] = name;
        this->scores[numStudents] = score;
        numStudents++;
    }
    // Function to add a new student to the list
    void addStudent()
    {
        try
        {
            cout << "Enter the name of the new student: ";
            string newName;
            getline(cin, newName);

            cout << "Enter the score of the new student: ";
            float newScore;
            cin >> newScore;
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            setData(newName, newScore);

            cout << "Student added successfully!\n";
            this_thread::sleep_for(chrono::seconds(3));
            system("cls");

            cin.clear();
        }
        catch (const exception &e)
        {
            cout << "Cannot add student. Please try again!\n";
            this_thread::sleep_for(chrono::seconds(3));
            system("cls");
            addStudent();
        }
    }

    // Function to display list of student
    void ListOfStudent()
    {
        if (numStudents == 0)
        {
            cout << "Don't have any student in list." << endl;
            this_thread::sleep_for(chrono::seconds(3));
            system("cls");
        }
        else
        {
            for (int i = 0; i < numStudents; i++)
            {
                cout << "Name: " << names[i] << ", Score: " << fixed << setprecision(1) << scores[i] << endl;
            }
            cout << "\n";
        }
        cout << "Press any key to continue...";
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin.get();
        system("cls");
    }
    // Function display score by name
    void printScoreByName(const string &name)
    {
        bool found = false;
        for (int i = 0; i < numStudents; ++i)
        {
            if (names[i] == name)
            {
                cout << "Name: " << names[i] << ", Score: " << scores[i] << endl;
                found = true;
            }
        }
        if (!found)
        {
            cout << "Cannot find the student!" << endl;
        }
    }
    // Function display name by score
    void printNameByScore(const float &score)
    {
        bool found = false;
        for (int i = 0; i < numStudents; ++i)
        {
            if (scores[i] == score)
            {
                cout << "Name: " << names[i] << ", Score: " << scores[i] << endl;
                found = true;
            }
        }
        if (!found)
        {
            cout << "Cannot find the student!" << endl;
        }
    }
    // Function display the student have the best score
    void printStudentHaveBestScore()
    {
        if (numStudents == 0)
        {
            cout << "Do not have any student in list!" << endl;
        }
        if (numStudents == 1)
        {
            ListOfStudent();
        }
        if (numStudents > 1)
        {
            float score = scores[0];
            for (int i = 1; i < numStudents; ++i)
            {
                if (score >= scores[i])
                    score = score;
                else
                    score = scores[i];
            }
            printNameByScore(score);
        }
        cout << "Press any key to continue...";
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cin.get();
        system("cls");
    }
    // Function to remove a student from the list by name
    void removeStudentByName()
    {
        try
        {
            cout << "Enter the name of the student you want to remove from the list: ";
            string studentName;
            getline(cin, studentName);
            for (int i = 0; i < numStudents; ++i)
            {
                if (names[i] == studentName)
                {
                    // Move elements after the deleted one to the left
                    for (int j = i; j < numStudents - 1; ++j)
                    {
                        names[j] = names[j + 1];
                        scores[j] = scores[j + 1];
                    }
                    numStudents--;
                }
            }
            cout << "Remove successfully!\n";
            this_thread::sleep_for(chrono::seconds(3));
            system("cls");
            cin.clear();
        }
        catch (const exception &e)
        {
            cout << "Cannot remove student. Please try again!\n";
            this_thread::sleep_for(chrono::seconds(3));
            system("cls");
            removeStudentByName();
        }
    }

    // Function to display the menu
    void displayMenu()
    {
        int choice;
        while (choice != 5)
        {
            choice = 0;
            cout << "-------------------------------------------------" << endl;
            cout << "| 1. Add a new student" << setw(28) << "|\n";
            cout << "| 2. Display the list of all students' name" << setw(7) << "|\n";
            cout << "| 3. Remove student from list by name" << setw(13) << "|\n";
            cout << "| 4. Display students have the best score" << setw(9) << "|\n";
            cout << "| 5. Quit" << setw(41) << "|\n";
            cout << "-------------------------------------------------" << endl;
            cout << "Enter your choice: ";
            cin >> choice;
            cout << "-------------------------------------------------" << endl;
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            this_thread::sleep_for(chrono::seconds(3));
            system("cls");
            switch (choice)
            {
            case 1:
                addStudent();
                break;
            case 2:
                ListOfStudent();
                break;
            case 3:
                removeStudentByName();
                break;
            case 4:
                printStudentHaveBestScore();
                break;
            case 5:
                cout << "Exiting program.\n";
                this_thread::sleep_for(chrono::seconds(3));
                system("cls");
                break;
            default:
                cout << "Invalid choice. Please enter a valid option.\n";
            }
        };
    }
};

int main()
{
    StudentManagement studentManager;

    studentManager.displayMenu();

    return 0;
}