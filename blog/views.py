from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post
from .forms import PostForm
from django.shortcuts import redirect
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse


def home_page(request):
    return render(request, 'webapp/base.html')


def send_email(request):
    subject = request.POST['subject']
    message = 'Name: ' + request.POST['name'] + '\n\nEmail: ' + request.POST['email'] + '\n\n' + request.POST['message']

    if request.method == "POST":
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            ['abawor200@gmail.com'],
            fail_silently=False
        )
        return JsonResponse({'status': 'success', 'message': 'Email sent successfully'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'})


def resume(request):
    return render(request, 'webapp/resume.html')


def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')
    return render(request, 'webapp/post_list.html', {'posts': posts})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'webapp/post_detail.html', {'post': post})


def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('blog')
    else:
        form = PostForm()
    return render(request, 'webapp/post_edit.html', {'form': form})


def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('post_list')
    else:
        form = PostForm(instance=post)
    return render(request, 'webapp/post_edit.html', {'form': form})
