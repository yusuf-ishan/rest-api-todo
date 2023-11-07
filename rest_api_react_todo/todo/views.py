from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Task
from .serializer import TaskSerializer, UserSerializer
from django.middleware.csrf import get_token
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# Create your views here.

def Home(request):
    return render(request, 'home_page.html', {})

def Completed(request):
    return render(request, 'completed.html', {})

def CSRFToken(request):
    return JsonResponse({'csrfToken': get_token(request)})

@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Detail Views': '/task-detail/<str:pk>/',
        'create': '/task-create/',
        'update': '/task-update/<str:pk>/',
        'delete': '/task-delete/<str:pk>/'
    }
    return Response(api_urls)

@api_view(['GET'])
def TaskList(request):
    tasks = Task.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def TaskDetails(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def TaskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST', 'GET'])
def TaskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def TaskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def login(request):
    return Response({})

@api_view(['POST'])
def SignUp(request):
    return Response({})

@api_view(['GET'])
def test_token(request):
    return Response({})