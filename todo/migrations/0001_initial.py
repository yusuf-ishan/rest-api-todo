# Generated by Django 4.2.6 on 2023-10-15 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='', max_length=256, null=True)),
                ('completed', models.BooleanField(blank=True, default=False, null=True)),
            ],
        ),
    ]
