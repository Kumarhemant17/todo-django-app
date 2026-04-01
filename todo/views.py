from django.shortcuts import render, redirect, get_object_or_404
from .models import Task

def task_list(request):
    tasks = Task.objects.all().order_by('-created_at')
    return render(request, 'todo/task_list.html', {'tasks': tasks})


def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        due_date = request.POST.get('due_date')
        priority = request.POST.get('priority')

        Task.objects.create(
            title=title,
            due_date=due_date if due_date else None,
            priority=priority
        )
        return redirect('task_list')

    return render(request, 'todo/add_task.html')


def edit_task(request, id):
    task = get_object_or_404(Task, id=id)

    if request.method == 'POST':
        task.title = request.POST.get('title')
        task.due_date = request.POST.get('due_date')
        task.priority = request.POST.get('priority')
        task.save()
        return redirect('task_list')

    return render(request, 'todo/edit_task.html', {'task': task})


def delete_task(request, id):
    task = get_object_or_404(Task, id=id)
    task.delete()
    return redirect('task_list')


def complete_task(request, id):
    task = get_object_or_404(Task, id=id)
    task.completed = not task.completed
    task.save()
    return redirect('task_list')