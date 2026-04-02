from django.shortcuts import render, redirect, get_object_or_404
from .models import Task
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime


def task_list(request):
    name = request.session.get('name')

    if not name:
        return redirect('set_name')

    filter_type = request.GET.get('filter')
    sort_type = request.GET.get('sort')

    if filter_type == 'completed':
        tasks = Task.objects.filter(completed=True)
    elif filter_type == 'pending':
        tasks = Task.objects.filter(completed=False)
    else:
        tasks = Task.objects.all()

    # SORT
    if sort_type == 'priority':
        tasks = sorted(tasks, key=lambda x: {
            'High': 1,
            'Medium': 2,
            'Low': 3
        }[x.priority])
    else:
        tasks = tasks.order_by('-created_at')

    # ✅ ADD OVERDUE FLAG
    now = timezone.now()
    for task in tasks:
        task.is_overdue = (
            task.due_date is not None and
            not task.completed and
            task.due_date < now
        )

    return render(request, 'todo/task_list.html', {
        'tasks': tasks,
        'name': name,
        'filter': filter_type,
        'sort': sort_type
    })


# ADD TASK
def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        due_date = request.POST.get('due_date')
        priority = request.POST.get('priority')

        # ✅ FIXED DATETIME (NO SHIFT)
        if due_date:
            due_date = datetime.strptime(due_date, "%Y-%m-%dT%H:%M")
            due_date = timezone.make_aware(due_date)
        else:
            due_date = None

        task = Task.objects.create(
            title=title,
            due_date=due_date,
            priority=priority
        )

        return JsonResponse({
            'id': task.id,
            'title': task.title,
            'priority': task.priority,
            'completed': task.completed,
            'due_date': task.due_date.isoformat() if task.due_date else None
        })


# EDIT TASK
def edit_task(request, id):
    if request.method == 'POST':
        task = get_object_or_404(Task, id=id)

        task.title = request.POST.get('title')

        due_date = request.POST.get('due_date')

        # ✅ FIXED DATETIME (NO SHIFT)
        if due_date:
            due_date = datetime.strptime(due_date, "%Y-%m-%dT%H:%M")
            due_date = timezone.make_aware(due_date)
        else:
            due_date = None

        task.due_date = due_date
        task.priority = request.POST.get('priority')

        task.save()

        return JsonResponse({
            'id': task.id,
            'title': task.title,
            'priority': task.priority,
            'due_date': task.due_date.isoformat() if task.due_date else None
        })


# DELETE TASK
def delete_task(request, id):
    if request.method == 'POST':
        task = get_object_or_404(Task, id=id)
        task.delete()
        return JsonResponse({'deleted': True})


# COMPLETE TASK
def complete_task(request, id):
    if request.method == 'POST':
        task = get_object_or_404(Task, id=id)
        task.completed = not task.completed
        task.save()

        return JsonResponse({'completed': task.completed})


# SET NAME
def set_name(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        request.session['name'] = name
        return redirect('task_list')

    return render(request, 'todo/set_name.html')